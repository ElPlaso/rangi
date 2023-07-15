"use client";

import "@/app/styles/horizontal_scroll.css";
import "@/app/styles/styles.css";
import VideoView from "./video_view";

interface CompareViewProps {
  song: any;
  sample: any;
}

export default async function CompareView({ song, sample }: CompareViewProps) {
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
