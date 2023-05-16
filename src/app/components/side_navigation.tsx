"use client";

import { useState, useEffect } from "react";
import "@/app/styles/side_nav.css";
import Link from "next/link";
import { Inter } from "@next/font/google";
import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import MusicIcon from "@mui/icons-material/MusicNote";
import StarIcon from "@mui/icons-material/Star";
import HamburgerIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Search from "./search";
import Splash from "./splash";

const inter = Inter({ subsets: ["latin"] });

export default function SideNavigation() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const SMALL_SCREEN = 1023;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // if mobile size, get nav bar component and add "mobile" class
      if (windowWidth <= SMALL_SCREEN) {
        const nav = document.getElementsByClassName("sidenav")[0];
        nav.classList.add("mobile");
      }
      // if desktop size, get nav bar component and remove "mobile" class
      else {
        const nav = document.getElementsByClassName("sidenav")[0];
        nav.classList.remove("mobile");
      }
    };

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const nav = document.getElementsByClassName("sidenav")[0];
    if (expanded) {
      nav.classList.add("expanded");
    } else {
      nav.classList.remove("expanded");
    }
  }, [expanded]);

  const toggleExpanded = () => {
    if (windowWidth <= SMALL_SCREEN) {
      setExpanded(!expanded);
    }
  };

  return (
    <div className="sidenav">
      <button className="toggle" onClick={toggleExpanded}>
        {expanded ? <CloseIcon /> : <HamburgerIcon />}
      </button>
      <div className="item nav-search">
        <Search onResultClick={toggleExpanded} />
      </div>
      <div className="divider" />
      <div className="item">
        <Splash />
      </div>
      <div className="divider" />
      <Link href="/" onClick={toggleExpanded}>
        <div className="listitem">
          <MusicIcon />
          <h2 className={inter.className}>Home</h2>
        </div>
      </Link>
      <Link href="/" onClick={toggleExpanded}>
        <div className="listitem">
          <StarIcon />
          <h2 className={inter.className}>Starred</h2>
        </div>
      </Link>
      <div className="divider" />

      <div className="footer">
        <a
          href="https://github.com/ElPlaso"
          target="_blank"
          rel="noopener noreferrer"
          style={{paddingTop: "3.5px"}}
        >
          <Image
            src="/el_plaso.svg"
            alt="Stool El Plaso Logo"
            className={styles.smallerLogo}
            width={125}
            height={25}
            priority
          />
        </a>
        <a
          href="https://docs.genius.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>Genius</h2>
        </a>
      </div>
    </div>
  );
}
