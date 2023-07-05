"use client";

import "@/app/styles/horizontal_scroll.css";
import "@/app/styles/styles.css";
import { Inter } from "@next/font/google";
import VideoView from "./video_view";
import { getSongData } from "@/app/samples/[id]/utils";

const inter = Inter({ subsets: ["latin"] });

interface CompareViewProps {
  id: string;
  sampleId: string;
}

const getSongs = async (id: string, sampleId: string) => {
  const songData: any = await getSongData(id);
  const sampleData: any = await getSongData(sampleId);

  return [songData, sampleData];
};

export default async function CompareView({ id, sampleId }: CompareViewProps) {
  const [song, sample] = await getSongs(id, sampleId);

  const songUrl = song ? song["youtube_url"] : "";
  const sampleUrl = sample ? sample["youtube_url"] : "";

  const regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

  const songYT = songUrl.match(regex) ? songUrl.match(regex)[1] : "";
  const sampleYT = sampleUrl.match(regex) ? sampleUrl.match(regex)[1] : "";

  return (
    <div
      className="videoComparisonRow"
      style={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <VideoView id={songYT} label={song ? song["title"] : ""} />
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
      <VideoView id={sampleYT} label={sample ? sample["title"] : ""} />
    </div>
  );
}
