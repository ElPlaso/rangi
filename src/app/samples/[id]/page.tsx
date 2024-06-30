import styles from "@/styles/page.module.css";
import SampledByScrollingList from "@/components/samples/sampled_by_scrolling_list";
import SampleResult from "@/components/samples/sample_result";
import SongTitle from "@/components/samples/song_title";
import { getSongData } from "@/lib/utils/song-utils";
import { Song } from "@/types/song";
import Result from "@/types/result";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const songData: Song | null = await getSongData(params.id);

  if (!songData) {
    return {
      title: "Samples",
    };
  }

  return {
    title: songData.title,
    description: `Samples used in ${songData.title} by ${songData.artist}`,
    twitter: {
      card: "summary",
      site: "@rangi",
    },
    openGraph: {
      description: `Samples used in ${songData.title} by ${songData.artist}`,
      type: "website",
      url: `https://rangi.beatbotanica.com/samples/${params.id}`,
    },
  };
}

export default async function SampleResultsPage({
  params,
}: {
  params: { id: string };
}) {
  const songData = await getSongData(params.id);

  if (songData !== null) {
    const samples: Array<Result> = songData.samples || [];

    const sampledBy: Array<Result> = songData.sampledBy || [];

    const shortTitle: string = songData.title;

    return (
      <>
        <SongTitle songData={songData} />

        <div className="container" style={{ marginTop: "150px" }}>
          {samples.length > 0 && (
            <div style={{ marginTop: "3rem" }}>
              <h4 className={styles.code}>{shortTitle} Samples</h4>
              <div
                className={styles.grid}
                style={{ marginTop: "2rem", marginBottom: "2rem" }}
              >
                {samples.map((sample) => {
                  return (
                    <SampleResult
                      key={sample.id}
                      parent={songData}
                      result={sample}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {sampledBy.length > 0 && (
            <div>
              <h4 className={`${styles.code} mb-8`}>
                Songs that sample {shortTitle}
              </h4>
              <SampledByScrollingList sampledByResults={sampledBy} />
            </div>
          )}

          {samples.length == 0 && sampledBy.length === 0 && (
            <h4 className={styles.code} style={{ marginTop: "2rem" }}>
              No info.
            </h4>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h4 className={styles.code} style={{ marginTop: "2rem" }}>
          A problem occurred.
        </h4>
      </>
    );
  }
}
