import Image from "next/image"
import styles from '@/app/styles/page.module.css'
import Result from "@/app/models/result"
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function SampleResult(props: any) {

  const result: Result = props.result || {};

  return (
    <Link href={`/samples/${result.id}`} className={styles.card} style={{justifyContent: 'center'}}>
      <h4 className={inter.className}>{result.title}</h4>
      <p className={inter.className}>{result.artist}</p>
      <p className={inter.className}>{result.year}</p>
      <Image
        src={result.imgUrl}
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