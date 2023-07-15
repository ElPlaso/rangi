"use client";

import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import "@/app/styles/accordion.css";
import React, { useState } from "react";
import Link from "next/link";
import DotsLoader from "@/app/components/dots_loader";
import SampleResult from "@/app/components/sample_result";
import Result from "@/app/types/result";
import { GET as samplesAPIGet } from "@/app/api/samples/route";

async function getSamples(id: String) {
  const request = new Request(`${process.env.URL}/api/samples?id=${id}`);
  return (await samplesAPIGet(request)).json();
}

export default function AlbumAppearanceResult({ song }: { song: Result }) {
  const [samples, setSamples] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(true);

  const handleClick = async () => {
    if (!loaded && !loading) {
      setHidden(false);
      setLoading(true);
      let data = await getSamples(song.id);
      setSamples(data);
      setLoading(false);
      setLoaded(true);
    } else {
      setHidden(!hidden);
    }
  };

  return (
    <>
      <input className="accordion" type="checkbox" id={song.id} />
      <label
        htmlFor={song.id}
        className="cardish albumAppearance"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "0.5rem",
        }}
        onClick={handleClick}
      >
        <div>
          <Link href={`/samples/${song.id}`}>
            <h4 className="textLink font-semibold">{song["title"]}</h4>
          </Link>
          <p>{song.artist}</p>
        </div>
      </label>

      <div className="content">
        {!hidden && (
          <div className={styles.grid}>
            {loading ? (
              <p style={{ margin: "2rem" }}>
                <DotsLoader />
              </p>
            ) : (
              loaded &&
              (samples?.length > 0 ? (
                samples?.map((sample) => {
                  return (
                    <SampleResult
                      key={sample.id}
                      parent={song}
                      result={sample}
                    />
                  );
                })
              ) : (
                <div className="cardish hovered">
                  <p>No samples found.</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
