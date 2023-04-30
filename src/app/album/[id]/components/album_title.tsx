import React from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AlbumTitle(props: any) {
  const albumData = props.albumData;

  return (
    <div
      style={{
        display: "flex",
        margin: "1rem",
        alignItems: "end",
      }}
    >
      <Image
        src={albumData["cover_art_url"]}
        alt={"Album Art"}
        width={150}
        height={150}
        style={{
          objectFit: "cover",
        }}
      />
      <div style={{ paddingLeft: "1rem" }}>
        <h3 className={inter.className}>Samples used in:</h3>
        <h1 className={inter.className}>{albumData["name"]}</h1>
        {albumData["artist"]["name"] && (
          <h2 className={inter.className}>{albumData["artist"]["name"]}</h2>
        )}
      </div>
    </div>
  );
}
