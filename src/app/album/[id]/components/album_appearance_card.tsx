import styles from "@/app/styles/page.module.css";
import { Inter } from "@next/font/google";
import AlbumAppearance from "@/app/models/album_appearance";

const inter = Inter({ subsets: ["latin"] });

export default function AlbumAppearanceCard(props: any) {
  const result: AlbumAppearance = props.result || {};

  return props.clicked == true ? (
    <div className={styles.card} style={{ display: "flex", background: 'rgba(var(--card-rgb), 0.1)',
    border: '1px solid rgba(var(--card-border-rgb), 0.15)'}}>
      <div style={{ paddingLeft: "1rem" }}>
        <h4 className={inter.className}>{result.title}</h4>
        <p className={inter.className}>{result.artist}</p>
      </div>
    </div>
  ) : (
    <div className={styles.card} style={{ display: "flex" }}>
      <div style={{ paddingLeft: "1rem" }}>
        <h4 className={inter.className}>{result.title}</h4>
        <p className={inter.className}>{result.artist}</p>
      </div>
    </div>
  );
}
