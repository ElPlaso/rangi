"use client";

import { Inter } from "@next/font/google";
import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import "@/app/styles/accordion.css";
import React, { useState } from "react";
import Result from "@/app/models/result";
import Link from "next/link";
import AlbumSample from "./album_sample";

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

  const [hidden, setHidden] = useState(true);

  const handleClick = async () => {
    if (!loaded) {
      setHidden(false);
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
      <input className="accordion" type="checkbox" id={song.id} />
      <label
        htmlFor={song.id}
        className="cardish albumAppearance"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "0.5rem",
        }}
        onClick={handleClick}
      >
        <div>
          <Link href={`/samples/${song.id}`} className={inter.className}>
            <h4 className="textLink">{song["title"]}</h4>
          </Link>
          <p className={inter.className}>{song["artist_names"]}</p>
        </div>
      </label>

      <div className="content">
        {!hidden && (
          <div className={styles.grid}>
            {loading ? (
              <p className={inter.className} style={{ margin: "2rem" }}>
                Loading . . .
              </p>
            ) : (
              loaded &&
              (samples?.length > 0 ? (
                samples?.map((sample) => {
                  return (
                    <AlbumSample
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
        )}
      </div>
    </>
  );
}
