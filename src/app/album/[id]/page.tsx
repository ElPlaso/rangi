"use client";

import { Inter } from "@next/font/google";
import AlbumAppearance from "@/app/models/album_appearance";
import AlbumAppearanceCard from "./components/album_appearance_card";
import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import React, { useState, useEffect } from "react";
import SearchResult from "@/app/search/[id]/components/search_result";
import Sample from "@/app/models/sample";
import "@/app/styles/scrollbar.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function AlbumPage({ params }: any) {
  const [songs, setSongs] = useState([] as any[]);

  const [albumData, setAlbumData] = useState(null as any);

  const [currentSongID, setCurrentSongID] = useState(null as any);

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
      .then((data) =>
        setCurrentSamples(data["song"]["song_relationships"]["0"]["songs"])
      )
      .catch((err) => console.error(err));

    console.log("hello");
    console.log(currentSongID);
  }, [currentSongID]);

  return (
    <>
      <div className={styles.description}>
        <Link href={`/`}>
          <h2 className={inter.className}>Samplify</h2>
        </Link>
      </div>
      {albumData != null && (
        <div style={{ display: "flex", margin: "2rem" }}>
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
              <h2 className={inter.className}>{albumData["artist"]["name"]}</h2>
            )}
          </div>
        </div>
      )}
      <div style={{ display: "flex", marginBottom: "4rem" }}>
        <ul style={{ height: "500px", width: "18%", overflowY: "scroll" }}>
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
        <div>
          <div className={styles.grid} style={{ padding: "1rem" }}>
            {currentSongID && currentSamples.length == 0 ? (
              <>
                <h1 className={inter.className}>...</h1>
              </>
            ) : (
              currentSamples?.map((sample) => {
                return (
                  <SearchResult
                    key={sample.id}
                    type="samples"
                    result={
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
    </>
  );
}
