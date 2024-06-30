import Image from "next/image";
import styles from "@/styles/page.module.css";
import "@/styles/styles.css";
import Result from "@/types/result";
import Link from "next/link";

export interface SampledByResultProps {
  result: Result;
}

export default function SampledByResult(props: SampledByResultProps) {
  const {
    result: { id, title, artist, year, imgUrl },
  } = props;

  return (
    <Link href={`/samples/${id}`}>
      <div className={`${styles.card} h-[250px] space-y-2`}>
        <div className="w-[100px] h-[100px]">
          <Image
            src={imgUrl}
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
          <h5 className="font-medium">{title}</h5>
          <p>{artist}</p>
          <p>{year}</p>
        </div>
      </div>
    </Link>
  );
}
