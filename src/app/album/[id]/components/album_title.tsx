"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "@/app/styles/styles.css";
import { FastAverageColor } from "fast-average-color";

export default function AlbumTitle(props: any) {
  const [avgColor, setAvgColor] = useState("fff");
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const albumData = props.albumData;

  const fac = new FastAverageColor();

  useEffect(() => {
    const setColor = async () => {
      let color = await fac.getColorAsync(albumData["cover_art_url"], {
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
  }, []);

  return (
    <div
      id="header"
      className="albumTitleContainer"
      style={{
        backgroundColor: scrolled ? avgColor : "transparent",
        backgroundImage: scrolled
          ? "linear-gradient(" + avgColor + avgColor + ")"
          : "linear-gradient(" + avgColor + ", transparent)",
        opacity: !isLight && scrolled ? 0.8 : 1,
        transition: "all 0.5s ease",
      }}
    >
      <div>
        <Image
          src={albumData["cover_art_url"]}
          alt={"Album Art"}
          width={scrolled ? 100 : 200}
          height={scrolled ? 100 : 200}
          style={{
            objectFit: "cover",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            transition: "all 0.5s ease",
          }}
        />
      </div>
      <div className="albumTitleHeader" style={{ paddingLeft: "1rem" }}>
        <h3>Samples used in:</h3>
        <h1>{albumData["name"]}</h1>
        {albumData["artist"]["name"] && <h2>{albumData["artist"]["name"]}</h2>}
      </div>
    </div>
  );
}
