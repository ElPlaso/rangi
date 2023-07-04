"use client";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/app/styles/page.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";

const inter = Inter({ subsets: ["latin"] });

export default function Links() {
  return (
    <div className={styles.grid} style={{ marginTop: "1rem" }}>
      <div
        className={styles.card}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p className={inter.className} style={{ cursor: "default" }}>
          Made by
        </p>
        <a
          href="https://github.com/ElPlaso"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/el_plaso.svg"
            alt="Stool El Plaso Logo"
            className={styles.smallerLogo}
            width={100}
            height={25}
            priority
          />
        </a>
      </div>
      <div
        className={styles.card}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p className={inter.className} style={{ cursor: "default" }}>
          Powered by
        </p>
        <a
          href="https://rapidapi.com/Glavier/api/genius-song-lyrics1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className={inter.className}>Genius</h3>
        </a>
      </div>
      <div
        className={styles.card}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p className={inter.className} style={{ cursor: "default" }}>
          Contribute or give feedback
        </p>
        <h3>
          <a
            href="https://github.com/ElPlaso/samplify_x/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </a>
        </h3>
      </div>
    </div>
  );
}
