"use client";

import { Inter } from "@next/font/google";
import AlbumAppearance from "@/app/models/album_appearance";
import AlbumAppearanceCard from "./components/album_appearance_card";
import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import React, { useState, useEffect } from "react";
import Sample from "@/app/models/sample";
import "@/app/styles/scrollbar.css";
import Link from "next/link";
import SampleResult from "@/app/samples/[id]/components/sample_result";

const inter = Inter({ subsets: ["latin"] });

export default function AlbumPage({ params }: any) {
  const [songs, setSongs] = useState([] as any[]);

  const [albumData, setAlbumData] = useState(null as any);

  const [currentSongID, setCurrentSongID] = useState(null as any);

  const [currentSongData, setCurrentSongData] = useState(null as any);

  const [currentSamples, setCurrentSamples] = useState([] as any[]);

  useEffect(() => {
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

    fetch(
      "https://genius-song-lyrics1.p.rapidapi.com/album/appearances/?id=" +
        params.id +
        "&page=1",
      options
    )
      .then((response) => response.json())
      .then((data) => setSongs(data["album_appearances"]))
      .catch((err) => console.error(err));

    fetch(
      "https://genius-song-lyrics1.p.rapidapi.com/album/details/?id=" +
        params.id,
      options
    )
      .then((response) => response.json())
      .then((data) => setAlbumData(data["album"]))
      .catch((err) => console.error(err));
  }, [params.id]);

  const handleSongSelect = (index: number) => {
    setCurrentSongID(songs[index]["song"].id);
  };

  useEffect(() => {
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

    fetch(
      "https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=" +
        currentSongID,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentSamples(data["song"]["song_relationships"]["0"]["songs"]);
        setCurrentSongData(data["song"]);
      })
      .catch((err) => console.error(err));

    console.log("hello");
    console.log(currentSongID);
  }, [currentSongID]);

  return (
    <div>
      <Link href={`/`}>
        <h2
          className={inter.className}
          style={{ marginLeft: "1rem", marginBottom: "2rem" }}
        >
          Samplify
        </h2>
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        {albumData != null && (
          <div
            style={{
              display: "flex",
              marginBottom: "2rem",
              marginLeft: "1rem",
            }}
          >
            <Image
              src={albumData["cover_art_url"]}
              alt={"Album Art"}
              width={100}
              height={100}
              style={{
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <div style={{ paddingLeft: "1rem" }}>
              <h1 className={inter.className}>{albumData["name"]}</h1>
              {albumData["artist"]["name"] && (
                <h2 className={inter.className}>
                  {albumData["artist"]["name"]}
                </h2>
              )}
            </div>
          </div>
        )}
        {currentSongData && (
          <p className={styles.card}>
            <Link
              href={`/samples/${currentSongData["id"]}`}
              className={inter.className}
            >
              {currentSongData["title"]} <span>{">"}</span>
            </Link>
          </p>
        )}
      </div>
      <div style={{ display: "flex" }}>
        <ul
          style={{
            height: "500px",
            overflowY: "scroll",
          }}
        >
          {songs?.map((song: any, index) => {
            return (
              <div
                key={song["song"].id}
                onClick={handleSongSelect.bind(handleSongSelect, index)}
              >
                <AlbumAppearanceCard
                  clicked={song["song"].id == currentSongID}
                  result={
                    new AlbumAppearance(
                      song["song"].id,
                      song["song"]["title"],
                      song["song"]["artist_names"]
                    )
                  }
                />
              </div>
            );
          })}
        </ul>
        <div
          className={styles.grid}
          style={{
            marginLeft: "1rem",
          }}
        >
          {currentSongID && currentSamples.length == 0 ? (
            <>
              <h1 className={inter.className} style={{ margin: "1rem" }}>
                ...
              </h1>
            </>
          ) : (
            currentSamples?.map((sample) => {
              return (
                <SampleResult
                  key={sample.id}
                  type="samples"
                  sample={
                    new Sample(
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
          )}
        </div>
      </div>
    </div>
  );
}
