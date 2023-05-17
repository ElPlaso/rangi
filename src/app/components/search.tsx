"use client";

import React, { useState, useEffect, useRef } from "react";
import "@/app/styles/search.css";
import { Inter } from "@next/font/google";
import SearchResult from "./search_result";
import Result from "../models/result";
import DotsLoader from "./dots_loader";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Search(props: any) {
  const [songResults, setSongResults] = useState([]);
  const [albumResults, setAlbumResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: any) => {
    setInput(e.target.value);
  };

  const clearResults = () => {
    setSongResults([]);
    setAlbumResults([]);
    inputRef.current!.value = "";
    setInput("");
  };

  // function to retry the request
  const retry = () => {
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
      })
      .then(() => setLoading(false))
      .catch((err) => console.error(err));
  };

  // set the songs when the input changes
  useEffect(() => {
    if (!input) {
      setSongResults([]);
      setAlbumResults([]);
      return;
    }
    let cancel = false;
    setLoading(true);
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
        if (cancel) return;
        setSongResults(data.sections[1]["hits"]);
        setAlbumResults(data.sections[4]["hits"]);
      })
      .then(() => setLoading(false))
      .catch((err) => console.error(err));

    return () => {
      cancel = true;
    };
  }, [input]);

  return (
    <div className="search">
      <input
        type="text"
        ref={inputRef}
        onChange={handleOnChange}
        placeholder="Search songs & albums"
      />
      <div className="search-results">
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <DotsLoader />
          </div>
        ) : songResults.length > 0 || albumResults.length > 0 ? (
          <>
            <div
              style={{
                marginTop: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 className={inter.className}>Results</h2>

              <h4
                onClick={clearResults}
                className={inter.className}
                style={{
                  textDecoration: "underline",
                  marginRight: "0.5rem",
                  cursor: "pointer",
                }}
              >
                Clear
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 className={inter.className}>Songs</h3>
              <div onClick={props.onResultClick}>
                <Link
                  href={`/search/${input}`}
                  className={inter.className}
                  style={{ marginRight: "1rem", textDecoration: "underline" }}
                >
                  More
                </Link>
              </div>
            </div>
            {songResults.length > 0 &&
              songResults.map((result: any) => (
                <div key={result["result"].id} onClick={props.onResultClick}>
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
                </div>
              ))}
            <h3 className={inter.className}>Albums</h3>
            {albumResults.length > 0 &&
              albumResults.map((result: any) => (
                <div key={result["result"].id} onClick={props.onResultClick}>
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
                </div>
              ))}
          </>
        ) : (
          input.trim().length > 0 && (
            <div className="search-error">
              <p className={inter.className} style={{ display: "flex" }}>
                A problem occurred, please&nbsp;
                <h4
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={retry}
                >
                  try again.
                </h4>
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
