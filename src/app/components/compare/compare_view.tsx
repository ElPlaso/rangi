"use client";

import "@/app/styles/horizontal_scroll.css";
import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import { Inter } from "@next/font/google";
import VideoView from "./video_view";
import { useEffect, useState } from "react";
import { getSongData } from "@/app/samples/[id]/utils";

const inter = Inter({ subsets: ["latin"] });

interface CompareViewProps {
  id: string;
  sampleId: string;
}

export default function CompareView({ id, sampleId }: CompareViewProps) {
  const [songYT, setSongYT] = useState<string>("");
  const [sampleYT, setSampleYT] = useState<string>("");

  useEffect(() => {
    let regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;
    const setYouTubeIds = async () => {
      const songData: any = await getSongData(id);
      const sampleData: any = await getSongData(sampleId);

      let songUrlId = songData["youtube_url"].match(regex)[1];
      let sampleUrlId = sampleData["youtube_url"].match(regex)[1];

      setSongYT(songUrlId ? songUrlId : "");
      setSampleYT(sampleUrlId ? sampleUrlId : "");
    };

    setYouTubeIds();
  }, []);

  return (
    <>
      <div style={{ marginTop: "1rem" }}>
        <div
          className="videoComparisonRow"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <VideoView id={songYT} label={"Song"} />
          <span>
            <h1
              className={inter.className}
              style={{
                marginLeft: "1rem",
                marginRight: "1rem",
                whiteSpace: "nowrap",
              }}
            >
              {"->"}
            </h1>
          </span>
          <VideoView id={sampleYT} label={"Sample"} />
        </div>
      </div>
      <div className={styles.grid} />
    </>
  );
}
