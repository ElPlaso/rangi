import Image from "next/image";
import Result from "@/app/types/result";
import Link from "next/link";

export default function StarredItemResult(props: { result: Result }) {
  const result = props.result;

  return (
    <div className="w-full h-full flex max-sm:flex-col">
      <Image
        src={result.imgUrl}
        alt="Cover Art"
        width={100}
        height={100}
        style={{
          objectFit: "cover",
          borderRadius: "5px",
          border: "1px solid #eaeaea",
          marginRight: "0.5rem",
        }}
      />
      <div
        className="sample-result-text"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        <Link
          href={`/samples/${result.id}`}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <h4 className={`textLink font-semibold`}>{result.title}</h4>
        </Link>
        <p>{result.artist}</p>
        <p>{result.year}</p>
      </div>
    </div>
  );
}
