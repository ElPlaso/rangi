import styles from "@/app/styles/page.module.css";
import SampledByScrollingList from "./components/sampled_by_scrolling_list";
import SampleResult from "@/app/components/sample_result";
import SongTitle from "./components/song_title";
import { getSongData } from "./utils";

export async function generateMetadata({ params }: any) {
  const songData: any = await getSongData(params.id);

  if (!songData) {
    return {
      title: "Samples",
    };
  }

  return {
    title: songData.title,
    description: `Samples used in ${songData.title} by ${songData.artist_names}`,
    twitter: {
      card: "summary",
      site: "@samplify",
    },
    openGraph: {
      description: `Samples used in ${songData.title} by ${songData.artist_names}`,
      type: "website",
      url: `https://samplify.vercel.app/samples/${params.id}`,
    },
  };
}

export default async function SampleResultsPage({ params }: any) {
  const songData: any = await getSongData(params.id);
  console.log(songData)

  if (songData != null) {
    let samples: any[] = songData["song_relationships"]["0"]["songs"];

    let songsThatSampleThisSong: any[] =
      songData["song_relationships"]["1"]["songs"];

    let shortTitle: string = songData["title"];

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
                      parent={{
                        id: params.id,
                        title: shortTitle,
                        artist: songData["artist_names"],
                        year: songData["release_date_components"]
                          ? songData["release_date_components"]["year"]
                          : "-",
                        imgUrl: songData["song_art_image_thumbnail_url"],
                      }}
                      result={{
                        id: sample.id,
                        title: sample["title"],
                        artist: sample["artist_names"],
                        year: sample["release_date_components"]
                          ? sample["release_date_components"]["year"]
                          : "-",
                        imgUrl: sample["song_art_image_thumbnail_url"],
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {songsThatSampleThisSong.length > 0 && (
            <div>
              <h4 className={styles.code}>Songs that sample {shortTitle}</h4>
              <SampledByScrollingList
                sampledByResults={songsThatSampleThisSong}
              />
            </div>
          )}

          {samples.length == 0 && songsThatSampleThisSong.length === 0 && (
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
