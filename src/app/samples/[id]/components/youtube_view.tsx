"use client";

import LoadingIndicator from "@/app/components/loading_indicator";
import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import { Inter } from "@next/font/google";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const inter = Inter({ subsets: ["latin"] });

export default function YoutubeView(props: any) {
  const opts = {
    width: "300",
    height: "169",
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
              margin: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p className={inter.className} style={{ marginBottom: "1rem" }}>
                Song
              </p>
              <div
                className="videoContainer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <YouTube videoId={props.id} opts={opts} />
              </div>
            </div>
            <span>
              <h1 className={inter.className} style={{ margin: "1rem" }}>
                {"->"}
              </h1>
            </span>
            <div>
              <p className={inter.className} style={{ marginBottom: "1rem" }}>
                Sample
              </p>
              <div
                className="videoContainer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
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
          {props.samples?.map((sample: any, index: number) => {
            return (
              <div
                key={sample.id}
                className={styles.card}
                style={
                  index === currentIndex
                    ? {
                        background: "rgba(var(--card-rgb), 0.1)",
                        border: "1px solid rgba(var(--card-border-rgb), 0.15)",
                        cursor: 'pointer'
                      }
                    : {cursor: 'pointer'}
                }
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
