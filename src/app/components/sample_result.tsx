import Image from "next/image";
import Sample from "../models/sample";
import styles from '../styles/page.module.css'

export default function SampleResult(props: any) {

  const sample: Sample = props.sample || {};

  return (
    <div className={styles.description}>
      <div className={styles.card}>
        <h3>{sample.title}</h3>
        <h5>{sample.artist}</h5>
        <h5>{sample.year}</h5>
        <br></br>
        <Image
          src={sample.imgUrl as string}
          alt="Song art image"
          width={300}
          height={300}
        />
      </div>
    </div >
  );

}