import Image from "next/image";
import "@/app/styles/styles.css";
import Result from "@/app/models/result";
import Link from "next/link";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AlbumSample(props: any) {
  const result: Result = props.result || {};

  return (
    <Link
      href={`/${props.type}/${result.id}`}
      className="cardish albumSample sample-result"
    >
      <div>
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
      </div>
      <div className="sample-result-text">
        <h4 className={inter.className}>{result.title}</h4>
        <p className={inter.className}>{result.artist}</p>
        <p className={inter.className}>{result.year}</p>
      </div>
    </Link>
  );
}
