"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import "@/styles/styles.css";
import { FastAverageColor } from "fast-average-color";
import { Song } from "@/types/song";

export interface SongTitleProps {
  songData: Pick<Song, "fullTitle" | "artist" | "imgUrl">;
}

export default function SongTitle(props: SongTitleProps) {
  const {
    songData: { fullTitle, artist, imgUrl },
  } = props;

  const [avgColor, setAvgColor] = useState("fff");
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const fac = useMemo(() => {
    return new FastAverageColor();
  }, []);

  useEffect(() => {
    const setColor = async () => {
      // TODO: Fix cors issue
      let color = await fac.getColorAsync(imgUrl, {
        algorithm: "sqrt",
      });
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
  }, [fac, imgUrl]);

  return (
    <div
      id="header"
      className="space-x-4 songTitleContainer"
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
        src={imgUrl}
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
      <div className="text-xl songTitleHeader">
        <h3 className="font-semibold">Showing results for:</h3>
        <h2>{fullTitle}</h2>
      </div>
    </div>
  );
}
