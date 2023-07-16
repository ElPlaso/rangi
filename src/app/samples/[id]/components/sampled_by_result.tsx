import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import Result from "@/app/types/result";
import Link from "next/link";

export default function SampledByResult(props: any) {
  const result: Result = props.result || {};

  return (
    <Link href={`/samples/${result.id}`}>
      <div className={`${styles.card} h-[250px] space-y-2`}>
        <div className="w-[100px] h-[100px]">
          <Image
            src={result.imgUrl}
            alt=""
            width={100}
            height={100}
            style={{
              objectFit: "cover",
              borderRadius: "5px",
              border: "1px solid #eaeaea",
            }}
            className="w-full h-full"
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
