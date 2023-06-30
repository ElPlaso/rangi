import Image from "next/image";
import "@/app/styles/search.css";
import Result from "@/app/types/result";
import Link from "next/link";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function SearchResult(props: any) {
  const result: Result = props.result || {};

  return (
    <>
      <Link href={`/${props.type}/${result.id}`} className="search-result">
        <div style={{ display: "flex" }}>
          <div>
            <span>
              <Image
                src={result.imgUrl}
                alt="Cover Art"
                width={75}
                height={75}
                style={{
                  objectFit: "cover",
                  borderRadius: "5px",
                  border: "1px solid #eaeaea",
                }}
              />
            </span>
          </div>
          <div style={{ paddingLeft: "1rem" }}>
            <h4 className={inter.className}>{result.title}</h4>
            <p className={inter.className}>{result.artist}</p>
            <p className={inter.className}>{result.year}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
