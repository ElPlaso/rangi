"use client";

import { Inter } from "@next/font/google";
import React, { useState } from "react";
import styles from "@/app/styles/page.module.css";
import "../styles/searchbar.css";
import SearchResult from "../search/[id]/components/search_result";
import Link from "next/link";
import Result from "../models/result";
import LoadingIndicator from "./loading_indicator";

const inter = Inter({ subsets: ["latin"] });

export default function SearchBar(props: any) {
  const [songResults, setSongResults] = useState([] as any[]);
  const [albumResults, setAlbumResults] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleOnChange = (e: any) => {
    setInput(e.target.value);
  };

  const findResults = () => {
    if (input.trim().length == 0) {
      setSongResults([]);
      setAlbumResults([]);
    } else {
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
      fetch(
        "https://genius-song-lyrics1.p.rapidapi.com/search/multi/?q=" +
          input +
          "&per_page=3&page=1",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setSongResults(data.sections[1]["hits"]);
          setAlbumResults(data.sections[4]["hits"]);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      findResults();
    }
  };

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div>
            <input
              name="search_input"
              className="prompt"
              id="search"
              onKeyDown={handleKeyDown}
              onChange={handleOnChange}
              autoComplete="off"
            />
            <label htmlFor="search">
              <span>
                <p className={inter.className}>search</p>
              </span>
            </label>
          </div>

          <div style={{ marginTop: "2rem" }}>
            {songResults.length > 0 && (
              <h2 className={inter.className}>Songs</h2>
            )}
            <div
              className={styles.grid}
              style={{ marginTop: "1rem", marginBottom: "2rem" }}
            >
              {songResults?.map((result: any) => {
                return (
                  <SearchResult
                    type="samples"
                    key={result["result"].id}
                    result={
                      new Result(
                        result["result"].id,
                        result["result"]["title"],
                        result["result"]["artist_names"],
                        result["result"]["release_date_components"]
                          ? result["result"]["release_date_components"]["year"]
                          : "-",
                        result["result"]["song_art_image_thumbnail_url"]
                      )
                    }
                  />
                );
              })}
            </div>
            {songResults.length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <div></div>
                <Link href={`/search/${input}`} className={inter.className}>
                  <div className={styles.card}>
                    More song results <span>-{">"}</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div style={{ marginTop: "1rem" }}>
            {albumResults.length > 0 && (
              <h2 className={inter.className}>Albums</h2>
            )}

            <div className={styles.grid} style={{ marginTop: "1rem" }}>
              {albumResults?.map((result: any) => {
                return (
                  <SearchResult
                    type="album"
                    key={result["result"].id}
                    result={
                      new Result(
                        result["result"].id,
                        result["result"]["name"],
                        result["result"]["artist"]["name"],
                        result["result"]["release_date_components"]
                          ? result["result"]["release_date_components"]["year"]
                          : "-",
                        result["result"]["cover_art_url"]
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
