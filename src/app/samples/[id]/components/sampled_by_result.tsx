import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import Result from "@/app/types/result";
import Link from "next/link";

export default function SampledByResult(props: any) {
  const result: Result = props.result || {};

  return (
    <Link href={`/samples/${result.id}`}>
      <div className={styles.card} style={{ height: "250px" }}>
        <div style={{ alignContent: "center" }}>
          <Image
            src={result.imgUrl}
            alt=""
            width={100}
            height={100}
            style={{
              objectFit: "cover",
              borderRadius: "5px",
              marginBottom: "1rem",
              border: "1px solid #eaeaea",
            }}
          />
        </div>
        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <h5 className="font-medium">{result.title}</h5>
          <p>{result.artist}</p>
          <p>{result.year}</p>
        </div>
      </div>
    </Link>
  );
}
