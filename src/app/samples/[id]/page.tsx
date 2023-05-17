import { Inter } from "@next/font/google";
import styles from "@/app/styles/page.module.css";
import Result from "@/app/models/result";
import Link from "next/link";
import YoutubeView from "./components/youtube_view";
import SampledByScrollingList from "./components/sampled_by_scrolling_list";
import SampleResult from "@/app/components/sample_result";
import SongTitle from "./components/song_title";

const inter = Inter({ subsets: ["latin"] });

async function getSongData(songID: String) {
  let song: any[];

  let headers = new Headers();
  headers.append(
    "X-RapidAPI-Key",
    process.env.NEXT_PUBLIC_RAPID_API_KEY as string
  );
  headers.append("X-RapidAPI-Host", "genius-song-lyrics1.p.rapidapi.com");

  const options: RequestInit = {
    method: "GET",
    headers: headers,
    cache: "no-store",
  };

  // Get the song data
  song = await fetch(
    "https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=" + songID,
    options
  )
    .then((response) => response.json())
    .then((data) => data["song"])
    .catch((err) => console.error(err));

  // samples = song['song_relationships']['0']['songs']

  // title: string = song['full_title']

  return song;
}

export default async function SampleResultsPage({ params }: any) {
  const songData: any = await getSongData(params.id);

  if (songData != null) {
    let samples: any[] = songData["song_relationships"]["0"]["songs"];

    let songsThatSampleThisSong: any[] =
      songData["song_relationships"]["1"]["songs"];

    // let title: string = songData["full_title"];

    let shortTitle: string = songData["title"];

    let regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

    let url: string = songData["youtube_url"];

    let youtubeId = url ? url.match(regex)![1] : null;

    return (
      <>
        <SongTitle songData={songData} />

        <div className="container" style={{ marginTop: "150px"}}>
          {youtubeId && samples.length > 0 && (
            <div>
              <h4 className={styles.code}>
                Compare
              </h4>
              <YoutubeView id={youtubeId} samples={samples} />
            </div>
          )}

          {samples.length > 0 && (
            <div style={{ marginTop: "3rem" }}>
              <h4 className={styles.code}>{shortTitle} Samples</h4>
              <div
                className={styles.grid}
                style={{ marginTop: "2rem", marginBottom: "2rem" }}
              >
                {samples?.map((sample) => {
                  return (
                    <SampleResult
                      type="samples"
                      key={sample.id}
                      result={
                        new Result(
                          sample.id,
                          sample["title"],
                          sample["artist_names"],
                          sample["release_date_components"]
                            ? sample["release_date_components"]["year"]
                            : "-",
                          sample["song_art_image_thumbnail_url"]
                        )
                      }
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
