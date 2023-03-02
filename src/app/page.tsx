"use client";

import Splash from "./components/splash";
import React, { useState, useEffect } from "react";
import styles from "./styles/page.module.css";
import "./styles/searchbar.css";
import SearchResult from "./search/[id]/components/search_result";
import Result from "./models/result";

import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [songResults, setSongResults] = useState([] as any[]);
  const [albumResults, setAlbumResults] = useState([] as any[]);

  const [input, setInput] = useState("");

  const handleInput = (e: any) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    let cancel = false;

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

      // Get the Song ID of the first 9 search results of the input.
      fetch(
        "https://genius-song-lyrics1.p.rapidapi.com/search/multi/?q=" +
          input +
          "&per_page=3&page=1",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          if (cancel === true) return;
          else if (data != null) setSongResults(data.sections[1]["hits"]);
          setAlbumResults(data.sections[4]["hits"]);
          console.log(data.sections);
        })
        .catch((err) => console.error(err));
    }

    return () => {
      cancel = true;
    };
  }, [input]);

  return (
    <>
      <Splash />
      <div>
        {songResults.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
              }}
            >
              <h2 className={inter.className}>Songs</h2>
              <p
                className={styles.card}
              >
                <Link href={`/search/${input}`} className={inter.className}>
                  More results <span>{'>'}</span>           
                </Link>
              </p>
            </div>
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
          </div>
        )}

        {albumResults.length > 0 && (
          <div>
            <h2 className={inter.className}>Albums</h2>

            <div
              className={styles.grid}
              style={{ marginTop: "1rem", marginBottom: "2rem" }}
            >
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
              })}{" "}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginBottom: "3rem" }}>
        <input
          name="search_input"
          className="prompt"
          id="search"
          onChange={handleInput}
          autoComplete="off"
        />
        <label htmlFor="search">
          <span>Search</span>
        </label>
      </div>
    </>
  );
}
