import Image from "next/image"
import styles from '@/app/styles/page.module.css'
import Sample from "@/app/models/sample"

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
          src={sample.imgUrl ? sample.imgUrl as string : 'https://images.genius.com/e0bb63ab1e7ddb2307011b443888ebf9.1000x1000x1.png'}
          alt="Song art image"
          width={300}
          height={300}
        />
      </div>
    </div >
  );

}