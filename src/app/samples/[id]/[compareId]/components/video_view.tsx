"use client";

import { useState, useEffect } from "react";
import { Inter } from "@next/font/google";
import YouTube from "react-youtube";

const inter = Inter({ subsets: ["latin"] });

interface VideoViewProps {
  id: string;
  label: string;
}

export default function VideoView({ id, label }: VideoViewProps) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const opts = {
    width: windowWidth > 1300 ? "400" : "300",
    height: windowWidth > 1300 ? "225" : "169",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="cardish hovered">
      <p className={inter.className} style={{ marginBottom: "1rem" }}>
        {label}
      </p>
      <div className="videoContainer">
        {id ? (
          <YouTube videoId={id} opts={opts} />
        ) : (
          <p className={inter.className}>Url not found</p>
        )}
      </div>
    </div>
  );
}
