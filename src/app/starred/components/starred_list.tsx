"use client";

import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import StarredItem from "./starred_item";
import FlipMove from "react-flip-move";
import { Inter } from "@next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function StarredList() {
  const starred = useSelector((state: RootState) => state.starred.items);
  const [visibleStarred, setVisibleStarred] = useState(starred);
  const [searchInput, setSearchInput] = useState<string>("");

  // filtering starred items
  useEffect(() => {
    if (searchInput === "") {
      setVisibleStarred(starred);
    } else {
      setVisibleStarred(
        starred.filter(
          (relation) =>
            relation.sampler.title
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            relation.sampler.artist
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            relation.samplee.title
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            relation.samplee.artist
              .toLowerCase()
              .includes(searchInput.toLowerCase())
        )
      );
    }
  }, [starred, searchInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleClearInput = () => {
    setSearchInput("");
  };

  if (starred.length === 0) {
    return (
      <div className="cardish hovered">
        <p className={inter.className}>You do not have any starred samples.</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <div className="search main-search" style={{ marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder="Search starred"
          onChange={handleInputChange}
          value={searchInput}
        />
        {searchInput && (
          <button className="clear-button" onClick={handleClearInput}></button>
        )}
      </div>
      <FlipMove className={styles.grid} duration={750}>
        {visibleStarred.map((relation) => {
          const key = `${relation.sampler.id}-${relation.samplee.id}`;
          return (
            <div key={key}>
              <StarredItem item={relation} />
            </div>
          );
        })}
      </FlipMove>
    </div>
  );
}
