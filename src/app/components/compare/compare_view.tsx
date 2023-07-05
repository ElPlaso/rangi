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

const getYoutubeIds = async (id: string, sampleId: string) => {
  let regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;
  const songData: any = await getSongData(id);
  const sampleData: any = await getSongData(sampleId);

  const songUrl = songData ? songData["youtube_url"] : "";
  const sampleUrl = sampleData ? sampleData["youtube_url"] : "";

  const songUrlId = songUrl.match(regex) ? songUrl.match(regex)[1] : "";
  const sampleUrlId = sampleUrl.match(regex) ? sampleUrl.match(regex)[1] : "";

  return [songUrlId, sampleUrlId];
};

export default async function CompareView({ id, sampleId }: CompareViewProps) {
  const [songYT, sampleYT] = await getYoutubeIds(id, sampleId);

  return (
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
  );
}
