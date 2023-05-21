import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import Result from "@/app/models/result";
import Link from "next/link";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function SampleResult(props: any) {
  const result: Result = props.result || {};

  return (
    <Link href={`/${props.type}/${result.id}`} className={styles.card}>
      <div className="sample-result">
        <div>
          <span>
            <Image
              src={result.imgUrl}
              alt="Cover Art"
              width={100}
              height={100}
              style={{
                objectFit: "cover",
                borderRadius: "5px",
                border: "1px solid #eaeaea",
              }}
            />
          </span>
        </div>
        <div className="sample-result-text">
          <h4 className={inter.className}>{result.title}</h4>
          <p className={inter.className}>{result.artist}</p>
          <p className={inter.className}>{result.year}</p>
        </div>
      </div>
    </Link>
  );
}