import Splash from "./components/splash";
import styles from "./styles/page.module.css";
import "./styles/searchbar.css";
import Image from "next/image";

import { Inter } from "@next/font/google";
import SearchBar from "./components/search_bar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className={styles.description}>
        <div
          className={styles.description}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
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
            style={{ marginBottom: "0.1rem" }}
          >
            <h2 className={inter.className}>Genius</h2>
          </a>
        </div>
      </div>

      <Splash />

      <div>
        <SearchBar />
      </div>
    </>
  );
}
