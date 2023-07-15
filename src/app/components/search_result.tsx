import Image from "next/image";
import "@/app/styles/search.css";
import Result from "@/app/types/result";
import Link from "next/link";

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
            <h4 className="font-semibold">{result.title}</h4>
            <p>{result.artist}</p>
            <p>{result.year}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
