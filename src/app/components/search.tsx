"use client";

import React, { useState, useEffect, useRef } from "react";
import "@/app/styles/search.css";
import { Inter } from "@next/font/google";
import SearchResult from "./search_result";
import DotsLoader from "./dots_loader";
import Link from "next/link";
import { GET as multiSearchAPIGet } from "@/app/api/search/multi/route";
import Result from "../types/result";

const inter = Inter({ subsets: ["latin"] });

export default function Search(props: any) {
  const [songResults, setSongResults] = useState<Result[]>([]);
  const [albumResults, setAlbumResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const searchParams = new URLSearchParams({ q: input, num: "3" });
  const request = new Request(
    `${process.env.URL}/api/search/multi?${searchParams}`
  );

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

  // for simply retrying the request in case of error, without cancel logic
  const handleRetry = async () => {
    setLoading(true);
    multiSearchAPIGet(request)
      .then((response) => response.json())
      .then((data) => {
        setError(false);
        setSongResults(data.songs);
        setAlbumResults(data.albums);
      })
      .then(() => setLoading(false))
      .catch(() => setError(true));
  };

  // set the songs when the input changes
  useEffect(() => {
    if (!input) {
      setSongResults([]);
      setAlbumResults([]);
      setError(false);
      return;
    }
    let cancel = false;
    setError(false);
    setLoading(true);
    multiSearchAPIGet(request)
      .then((response) => response.json())
      .then((data) => {
        // cancel the request
        if (cancel) return;
        setSongResults(data.songs);
        setAlbumResults(data.albums);
      })
      .then(() => setLoading(false))
      .catch(() => setError(true));
    return () => {
      // we wish to cancel the request if the input changes before the request is finished
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
      {input && (
        <button className="clear-button" onClick={clearResults}></button>
      )}
      <div className="search-results">
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <DotsLoader />
          </div>
        ) : songResults.length > 0 || albumResults.length > 0 ? (
          <>
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
                <div key={result.id} onClick={props.onResultClick}>
                  <SearchResult
                    type="samples"
                    key={result.id}
                    result={result}
                  />
                </div>
              ))}
            <h3 className={inter.className}>Albums</h3>
            {albumResults.length > 0 &&
              albumResults.map((result: any) => (
                <div key={result.id} onClick={props.onResultClick}>
                  <SearchResult type="album" key={result.id} result={result} />
                </div>
              ))}
          </>
        ) : (
          error && (
            <div
              className={`search-error ${inter.className}`}
              style={{ display: "flex" }}
            >
              A problem occurred, please&nbsp;
              <h4
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={handleRetry}
              >
                try again.
              </h4>
            </div>
          )
        )}
      </div>
    </div>
  );
}
