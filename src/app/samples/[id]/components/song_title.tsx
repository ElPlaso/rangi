"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "@/app/styles/styles.css";
import { FastAverageColor } from "fast-average-color";

export default function SongTitle(props: any) {
  const [avgColor, setAvgColor] = useState("fff");
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const songData = props.songData;

  const fac = new FastAverageColor();

  useEffect(() => {
    const setColor = async () => {
      let color = await fac.getColorAsync(
        songData["song_art_image_thumbnail_url"],
        {
          algorithm: "sqrt",
        }
      );
      color.isLight ? setIsLight(true) : setIsLight(false);
      setAvgColor(color.hex);
    };

    setColor();

    const header = document.getElementById("header") as HTMLElement;
    const sticky = header.offsetTop;

    function onScroll(): void {
      if (window.pageYOffset > sticky) {
        header.classList.add("scrolled");
        setScrolled(true);
      } else {
        header.classList.remove("scrolled");
        setScrolled(false);
      }
    }

    window.onscroll = () => onScroll();
  }, []);

  return (
    <div
      id="header"
      className="songTitleContainer space-x-4"
      style={{
        backgroundColor: scrolled ? avgColor : "transparent",
        backgroundImage: scrolled
          ? "linear-gradient(" + avgColor + avgColor + ")"
          : "linear-gradient(" + avgColor + ", transparent)",
        opacity: !isLight && scrolled ? 0.8 : 1,
        transition: "all 0.5s ease",
      }}
    >
      <Image
        src={songData["song_art_image_thumbnail_url"]}
        alt={"Album Art"}
        width={scrolled ? 75 : 150}
        height={scrolled ? 75 : 150}
        style={{
          objectFit: "cover",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          transition: "all 0.5s ease",
        }}
        className={scrolled ? "w-[75px] h-[75px]" : "w-[150px] h-[150px]"}
      />
      <div className="songTitleHeader text-xl">
        <h3 className="font-semibold">Showing results for:</h3>
        {songData["full_title"] && <h2>{songData["full_title"]}</h2>}
      </div>
    </div>
  );
}
