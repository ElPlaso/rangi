"use client";

import "@/app/styles/side_nav.css";
import Link from "next/link";
import { Inter } from "@next/font/google";
import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import MusicIcon from "@mui/icons-material/MusicNote";
import StarIcon from "@mui/icons-material/Star";
import Search from "./search";
import Splash from "./splash";

const inter = Inter({ subsets: ["latin"] });

export default function SideNavigation() {
  return (
    <div className="sidenav">
      <Splash />
      <div className="divider" />
      <Link href="/">
        <div className="listitem">
          <MusicIcon />
          <h2 className={inter.className}>Home</h2>
        </div>
      </Link>
      <Link href="/">
        <div className="listitem">
          <StarIcon />
          <h2 className={inter.className}>Starred</h2>
        </div>
      </Link>
      <div className="divider" />
      <div className="item" style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Search />
      </div>
      <div className="footer">
        <a
          href="https://github.com/ElPlaso"
          target="_blank"
          rel="noopener noreferrer"
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
          style={{ marginBottom: "0.2rem" }}
        >
          <h2 className={inter.className}>Genius</h2>
        </a>
      </div>
    </div>
  );
}
