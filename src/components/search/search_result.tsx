import Image from "next/image";
import "./search.css";
import Result from "@/types/result";
import Link from "next/link";

export default function SearchResult(props: any) {
  const result: Result = props.result || {};

  return (
    <>
      <Link
        href={`/${props.type}/${result.id}`}
        className="search-result flex w-full space-x-4"
      >
        <div className="w-[100px]">
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
        <div className="w-full">
          <h4 className="font-semibold">{result.title}</h4>
          <p>{result.artist}</p>
          <p>{result.year}</p>
        </div>
      </Link>
    </>
  );
}
