import Image from "next/image";
import styles from '@/app/styles/page.module.css'
import Result from "@/app/models/result";

export default function SearchResult(props: any) {

  const result: Result = props.result || {};

  return (
    <div className={styles.description}>
      <div className={styles.card}>
        <h3>{result.title}</h3>
        <h5>{result.artist}</h5>
        <h5>{result.year}</h5>
        <br></br>
        <Image
          src={result.imgUrl}
          alt="Song art image"
          width={300}
          height={300}
        />
      </div>
    </div >
  );

}