"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import "@/styles/styles.css";
import { FastAverageColor } from "fast-average-color";
import Result from "@/types/result";

export interface AlbumTitleProps {
  album: Pick<Result, "title" | "artist" | "imgUrl">;
}

export default function AlbumTitle(props: AlbumTitleProps) {
  const {
    album: { title, artist, imgUrl },
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
      setIsLight(color.isLight);
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
  }, [imgUrl, fac]);

  return (
    <div
      id="header"
      className="space-x-4 albumTitleContainer"
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
        width={scrolled ? 100 : 200}
        height={scrolled ? 100 : 200}
        style={{
          objectFit: "cover",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          transition: "all 0.5s ease",
        }}
        className={scrolled ? "w-[100px] h-[100px]" : "w-[200px] h-[200px]"}
      />
      <div className="text-xl albumTitleHeader">
        <h3 className="font-semibold">Samples used in</h3>
        <h1>{title}</h1>
        <h2>{artist}</h2>
      </div>
    </div>
  );
}
