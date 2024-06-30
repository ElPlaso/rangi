"use client";

import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useMemo,
} from "react";
import "./search.css";
import SearchResult from "./search_result";
import DotsLoader from "@/components/loading/dots_loader";
import Link from "next/link";
import { GET as multiSearchAPIGet } from "@/app/api/search/multi/route";
import Result from "@/types/result";

export interface SearchProps {
  onResultClick: () => void;
}

export default function Search(props: SearchProps) {
  const { onResultClick } = props;

  const [songResults, setSongResults] = useState<Result[]>([]);
  const [albumResults, setAlbumResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const searchParams = useMemo(
    () => new URLSearchParams({ q: input, num: "3" }),
    [input]
  );
  const request = useMemo(
    () => new Request(`${process.env.URL}/api/search/multi?${searchParams}`),
    [searchParams]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  }, [input, request]);

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
              <h3>Songs</h3>
              <div onClick={onResultClick}>
                <Link
                  href={`/search/${input}`}
                  style={{ marginRight: "1rem", textDecoration: "underline" }}
                >
                  More
                </Link>
              </div>
            </div>
            {songResults.length > 0 &&
              songResults.map((result: Result) => (
                <div key={result.id} onClick={onResultClick}>
                  <SearchResult
                    type="samples"
                    key={result.id}
                    result={result}
                  />
                </div>
              ))}
            <h3>Albums</h3>
            {albumResults.length > 0 &&
              albumResults.map((result: Result) => (
                <div key={result.id} onClick={onResultClick}>
                  <SearchResult type="album" key={result.id} result={result} />
                </div>
              ))}
          </>
        ) : (
          error && (
            <div className={`search-error`} style={{ display: "flex" }}>
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
