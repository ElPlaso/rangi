import Image from "next/image"
import styles from '@/app/styles/page.module.css'
import Sample from "@/app/models/sample"
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function SampleResult(props: any) {

  const sample: Sample = props.sample || {};

  return (
    <Link href={`/samples/${sample.id}`} className={styles.card} style={{justifyContent: 'center'}}>
      <h4 className={inter.className}>{sample.title}</h4>
      <p className={inter.className}>{sample.artist}</p>
      <p className={inter.className}>{sample.year}</p>
      <Image
        src={sample.imgUrl ? sample.imgUrl as string : 'https://images.genius.com/e0bb63ab1e7ddb2307011b443888ebf9.1000x1000x1.png'}
        alt="Song art image"
        width={250}
        height={250}
        style={{
          padding: '1rem',
          objectFit: "cover",
          borderRadius: "25px",
        }}
      />
    </Link >
  );

}