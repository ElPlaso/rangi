import Image from "next/image";
import "./search.css";
import Result from "@/types/result";
import Link from "next/link";

export interface SearchResultProps {
  result: Result;
  type: string;
}

export default function SearchResult(props: SearchResultProps) {
  const {
    result: { id, title, artist, imgUrl, year },
    type,
  } = props;

  return (
    <>
      <Link
        href={`/${type}/${id}`}
        className="flex w-full space-x-4 search-result"
      >
        <div className="w-[100px]">
          <span>
            <Image
              src={imgUrl}
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
          <h4 className="font-semibold">{title}</h4>
          <p>{artist}</p>
          <p>{year}</p>
        </div>
      </Link>
    </>
  );
}
