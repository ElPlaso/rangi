import SampleRelation from "@/app/types/sample-relation";
import styles from "@/app/styles/page.module.css";
import Image from "next/image";
import { Inter } from "@next/font/google";
import "@/app/styles/styles.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const inter = Inter({ subsets: ["latin"] });

export default function StarredItem(props: { item: SampleRelation }) {
  const item = props.item;

  return (
    <div
      className={styles.card}
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div className="sample-result" style={{ width: "100%" }}>
        <Image
          src={item.sampler.imgUrl}
          alt="Cover Art"
          width={75}
          height={75}
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #eaeaea",
            marginTop: "1rem",
          }}
        />
        <div className="sample-result-text" style={{ marginTop: "1rem" }}>
          <h4 className={inter.className}>{item.sampler.title}</h4>
          <p className={inter.className}>{item.sampler.artist}</p>
          <p className={inter.className}>{item.sampler.year}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "1rem",
          alignItems: "center",
          opacity: 0.15,
        }}
      >
        <div
          style={{
            border: "1px solid",
            height: "1px",
            width: "100%",
          }}
        />
        <ExpandMoreIcon />
      </div>
      <div className="sample-result" style={{ width: "100%" }}>
        <Image
          src={item.samplee.imgUrl}
          alt="Cover Art"
          width={75}
          height={75}
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #eaeaea",
            marginTop: "1rem",
          }}
        />
        <div className="sample-result-text" style={{ marginTop: "1rem" }}>
          <h4 className={inter.className}>{item.samplee.title}</h4>
          <p className={inter.className}>{item.samplee.artist}</p>
          <p className={inter.className}>{item.samplee.year}</p>
        </div>
      </div>
    </div>
  );
}
