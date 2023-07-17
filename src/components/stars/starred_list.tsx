"use client";

import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";
import "@/styles/styles.css";
import StarredItem from "./starred_item";
import FlipMove from "react-flip-move";
import { useState, useEffect } from "react";
import DotsLoader from "@/components/loading/dots_loader";

export default function StarredList() {
  const starred = useSelector((state: RootState) => state.starred.items);
  const [visibleStarred, setVisibleStarred] = useState(starred);
  const [searchInput, setSearchInput] = useState<string>("");
  const [showList, setShowList] = useState(false);

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

  // FlipMove relies on client-side rendering, so we need to wait for the client to render
  // otherwise the initial ui will not match what was rendered on the server causing Hydration failure
  useEffect(() => {
    setShowList(true);
  }, []);

  return (
    <div className="lg:w-[75%] md:w-full sm:w-full max-sm:w-full">
      <div className="search main-search" style={{ marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder="Search stars"
          onChange={handleInputChange}
          value={searchInput}
        />
        {searchInput && (
          <button className="clear-button" onClick={handleClearInput}></button>
        )}
      </div>
      {showList ? (
        starred.length > 0 ? (
          visibleStarred.length ? (
            <FlipMove duration={750}>
              {visibleStarred.map((relation, index) => {
                const key = `${relation.sampler.id}-${relation.samplee.id}`;
                return (
                  <div
                    key={key}
                    style={{
                      marginTop: index === 0 ? 0 : "0.5rem",
                    }}
                  >
                    <StarredItem item={relation} />
                  </div>
                );
              })}
            </FlipMove>
          ) : (
            <div className="cardish hovered">
              <p>No samples found</p>
            </div>
          )
        ) : (
          <div className="cardish hovered">
            <p>You do not have any starred samples</p>
          </div>
        )
      ) : (
        // Show loader while waiting for client-side rendering
        <div className="w-full flex items-center justify-center">
          <DotsLoader />
        </div>
      )}
    </div>
  );
}
