"use client";

import { Inter } from "@next/font/google";
import styles from "@/app/styles/page.module.css";
import React, { useState } from "react";
import SearchResult from "@/app/components/search_result";
import Result from "@/app/models/result";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

async function getSamples(id: String) {
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

  return fetch(
    "https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=" + id,
    options
  )
    .then((response) => response.json())
    .then((data) => data["song"]["song_relationships"]["0"]["songs"])
    .catch((err) => console.error(err));
}

export default function AlbumAppearanceResult({ songData }: any) {
  const { song } = songData || {};

  const [samples, setSamples] = useState([] as any[]);

  const [loading, setLoading] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const [hidden, setHidden] = useState(false);

  const handleClick = async () => {
    if (!loaded) {
      setLoading(true);
      let data = await getSamples(song.id);
      setSamples(data);
      setLoading(false);
      setLoaded(true);
    } else {
      setHidden(!hidden);
    }
  };

  return (
    <>
      <div className={styles.card} onClick={handleClick}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span>
              <h3 className={inter.className}>{song["title"]}</h3>
              <p className={inter.className}>{song["artist_names"]}</p>
            </span>
          </div>
          <div>
            <span>
              <Link href={`/samples/${song.id}`} className={inter.className}>
                <p className={styles.card}>More -{">"}</p>
              </Link>
            </span>
          </div>
        </div>
        <div className={styles.grid}>
          {loading ? (
            <p className={inter.className} style={{ margin: "2rem" }}>
              Loading . . .
            </p>
          ) : (
            loaded &&
            !hidden &&
            (samples?.length > 0 ? (
              samples?.map((sample) => {
                return (
                  <SearchResult
                    key={sample.id}
                    type="samples"
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
              })
            ) : (
              <p className={inter.className} style={{ margin: "2rem" }}>
                No samples found.
              </p>
            ))
          )}
        </div>
      </div>
    </>
  );
}
