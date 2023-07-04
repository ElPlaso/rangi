import Splash from "./components/splash";
import { Inter } from "@next/font/google";
import "@/app/styles/styles.css";
import styles from "@/app/styles/page.module.css";
import Image from "next/image";
import GitHubIcon from "@mui/icons-material/GitHub";
import Links from "./components/links";

const inter = Inter({ subsets: ["latin"] });

const getTime = () => {
  const date = new Date();
  const hours = date.getHours();

  return hours;
};

export default function Home() {
  const time = getTime();

  return (
    <div className="container">
      <h1 className={inter.className}>
        Good{" "}
        {time >= 6 && time < 18 ? (
          <>morning</>
        ) : time >= 18 && time < 24 ? (
          <>evening</>
        ) : (
          <>night</>
        )}
      </h1>
      <Splash />

      <div className={styles.grid} style={{ marginTop: "1.5rem" }}>
        <div className={styles.card}>
          <h2 className={inter.className}>Discover</h2>
          <p className={inter.className} style={{ width: "100%" }}>
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
