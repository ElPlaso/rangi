"use client";

import { Inter } from "@next/font/google";
import AlbumAppearance from "@/app/models/album_appearance";
import AlbumAppearanceCard from "./components/album_appearance_card";
import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import React, { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function AlbumPage({ params }: any) {
  const [songs, setSongs] = useState([] as any[]);

  const [albumData, setAlbumData] = useState(null as any);

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
  }, []);

  return (
    <>
      {albumData != null && (
        <div style={{ display: "flex" }}>
          <Image
            src={albumData["header_image_url"]}
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
      <div style={{ marginTop: "2rem", marginBottom: "4rem" }}>
        {songs?.map((song: any) => {
          return (
            <AlbumAppearanceCard
              key={song["song"].id}
              result={
                new AlbumAppearance(
                  song["song"].id,
                  song["song"]["title"],
                  song["song"]["artist_names"]
                )
              }
            />
          );
        })}
      </div>
    </>
  );
}
