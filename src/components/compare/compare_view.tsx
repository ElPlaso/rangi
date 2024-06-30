"use client";

import "@/styles/styles.css";
import VideoView from "./video_view";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Song } from "@/types/song";

interface CompareViewProps {
  song: Song;
  sample: Song;
}

export default function CompareView({ song, sample }: CompareViewProps) {
  const songUrl = song.youtubeUrl || "";
  const sampleUrl = sample.youtubeUrl || "";

  const regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

  const songYtRegX = songUrl.match(regex);
  const sampleYtRegX = sampleUrl.match(regex);

  const songYT = songYtRegX ? songYtRegX[1] : "";
  const sampleYT = sampleYtRegX ? sampleYtRegX[1] : "";

  return (
    <div className="flex items-center justify-center p-4 bg-white shadow-lg videoComparisonRow dark:bg-black rounded-xl">
      <VideoView id={songYT} label={song ? song["title"] : ""} />
      <span>
        <h1
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
            whiteSpace: "nowrap",
          }}
        >
          <ArrowForwardIcon />
        </h1>
      </span>
      <VideoView id={sampleYT} label={sample ? sample["title"] : ""} />
    </div>
  );
}
