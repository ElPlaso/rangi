import Splash from "./components/splash";
import { Inter } from "@next/font/google";
import "@/app/styles/styles.css";
import styles from "@/app/styles/page.module.css";
import Links from "./components/links";
import Greeting from "./components/greeting";
import RandomLyricText from "./components/random_lyric_text";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container">
      <div style={{display: "flex", width: "100%", justifyContent: "space-between"}} >
        <Greeting />
        <RandomLyricText />
      </div>
      <Splash />

      <div className={styles.grid} style={{ marginTop: "1.5rem" }}>
        <div className={styles.card}>
          <h2 className={inter.className}>Discover</h2>
          <p className={inter.className}>
            Discover new music through samples used in your favourite songs and
            albums.
          </p>
        </div>
        <div className={styles.card}>
          <h2 className={inter.className}>Compare</h2>
          <p className={inter.className}>
            Compare songs to their samples and the songs that sample them.
          </p>
        </div>
        <div className={styles.card}>
          <h2 className={inter.className}>Explore</h2>
          <p className={inter.className}>
            Explore the nearly endless knot of music and samples.
          </p>
        </div>
      </div>
      <Links />
    </div>
  );
}
