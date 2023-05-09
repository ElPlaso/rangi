import { Inter } from "@next/font/google";
import styles from "@/app/styles/page.module.css";
import SearchBar from "@/app/components/search_bar";
import Result from "@/app/models/result";
import Link from "next/link";
import Image from "next/image";
import YoutubeView from "./components/youtube_view";
import SampledByScrollingList from "./components/sampled_by_scrolling_list";
import SearchResult from "@/app/components/search_result";

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

    let title: string = songData["full_title"];

    let shortTitle: string = songData["title"];

    let regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

    let url: string = songData["youtube_url"];

    let youtubeId = url ? url.match(regex)![1] : null;

    return (
      <>
        <div className={styles.description}>
          <p>
            <Link href="/">
              <Image
                className={styles.logo}
                src="/samplify.svg"
                alt="Samplify X Logo"
                width={150}
                height={20}
                priority
              />
            </Link>
          </p>
          <div>{title}</div>
        </div>

        {youtubeId && samples.length > 0 && (
          <div>
            <h4 className={styles.code} style={{ marginTop: "3rem" }}>
              Compare
            </h4>
            <YoutubeView id={youtubeId} samples={samples} />
          </div>
        )}

        {samples.length > 0 && (
          <div style={{ marginTop: "3rem", padding: "1rem" }}>
            <h4 className={styles.code}>{shortTitle} Samples</h4>
            <div
              className={styles.grid}
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
              {samples?.map((sample) => {
                return (
                  <SearchResult
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
          <>
            <div className="container">
              <h4 className={styles.code}>
                Songs that sample {shortTitle}
              </h4>
            </div>
            <SampledByScrollingList
              sampledByResults={songsThatSampleThisSong}
            />
          </>
        )}

        {samples.length == 0 && songsThatSampleThisSong.length === 0 && (
          <h4 className={styles.code} style={{ marginTop: "2rem" }}>
            No info.
          </h4>
        )}

        <div style={{ marginBottom: "3rem" }}>
          <SearchBar />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.description}>
          <Link href="/">
            <h2 className={styles.code}>Samplify</h2>
          </Link>
        </div>
        <h4 className={styles.code} style={{ marginTop: "2rem" }}>
          Song not found.
        </h4>
        <div style={{ marginBottom: "4rem" }}>
          <SearchBar />
        </div>
      </>
    );
  }
}
