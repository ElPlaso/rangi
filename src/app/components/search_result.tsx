import Image from "next/image";
import Result from "../models/result";
import styles from '../styles/page.module.css'

export default function SearchResult(props: any) {

  const result: Result = props.result || {};

  const handleClick = () => {
    props.getSamples(result.id);
  }

  return (
    <div className={styles.description}>
      <div className={styles.card} onClick={handleClick}>
        <h3>{result.title}</h3>
        <h5>{result.artist}</h5>
        <h5>{result.year}</h5>
        <br></br>
        <Image
          src={result.imgUrl ? result.imgUrl as string : 'https://images.genius.com/e0bb63ab1e7ddb2307011b443888ebf9.1000x1000x1.png'}
          alt="Song art image"
          width={300}
          height={300}
        />
      </div>
    </div >
  );

}