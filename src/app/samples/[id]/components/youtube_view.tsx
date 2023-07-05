"use client";

import LoadingIndicator from "@/app/components/loading_indicator";
import "@/app/styles/horizontal_scroll.css";
import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import { Inter } from "@next/font/google";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const inter = Inter({ subsets: ["latin"] });

export default function YoutubeView(props: any) {
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentSampleId, setCurrentSampleId] = useState(null as any);

  const [loading, setLoading] = useState(false);

  const [urls, setUrls] = useState(Array(props.samples.length).fill(null));

  useEffect(() => {
    const fetchData = async () => {
      if (urls[currentIndex] == null) {
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

        setLoading(true);

        // Get the song data
        let url = await fetch(
          "https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=" +
            props.samples[currentIndex].id,
          options
        )
          .then((response) => response.json())
          .then((data) => data["song"]["youtube_url"])
          .catch((err) => console.error(err));

        let regex = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

        let sampleYoutubeId: string = url ? url.match(regex)[1] : "";
        setCurrentSampleId(sampleYoutubeId);

        urls[currentIndex] = sampleYoutubeId;
        setUrls(urls);

        setLoading(false);
      } else {
        setCurrentSampleId(urls[currentIndex]);
      }
    };

    fetchData();
  }, [currentIndex, props.samples, urls]);

  const handleClick = async (index: any) => {
    if (!loading) {
      setCurrentIndex(index);
    }
  };

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
          <div className="cardish hovered">
            <p className={inter.className} style={{ marginBottom: "1rem" }}>
              Song
            </p>
            <div
              className="videoContainer"
            >
              <YouTube videoId={props.id} opts={opts} />
            </div>
          </div>
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
          <div className="cardish hovered">
            <p className={inter.className} style={{ marginBottom: "1rem" }}>
              Sample
            </p>
            <div
              className="videoContainer"
            >
              {loading ? (
                <LoadingIndicator />
              ) : currentSampleId != "" && currentSampleId ? (
                <YouTube videoId={currentSampleId} opts={opts} />
              ) : (
                <p className={inter.className}>Url not found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.grid} />

      {props.samples.length > 1 && (
        <div
          className={styles.grid}
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          {props.samples.map((sample: any, index: number) => {
            return (
              <div
                key={sample.id}
                className={
                  index == currentIndex ? "cardish hovered" : styles.card
                }
                style={{
                  padding: "0.5rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  cursor: loading ? "wait" : "pointer",
                }}
                onClick={() => {
                  handleClick(index);
                }}
              >
                <p className={inter.className}>{sample["title"]}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
