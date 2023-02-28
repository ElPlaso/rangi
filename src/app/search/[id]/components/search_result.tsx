import Image from "next/image";
import styles from '@/app/styles/page.module.css'
import Result from "@/app/models/result";
import Link from "next/link";
import { Inter } from "@next/font/google";


const inter = Inter({ subsets: ['latin'] })

export default function SearchResult(props: any) {

  const result: Result = props.result || {};

  return (
    <Link href={`/samples/${result.id}`} className={styles.card}>
      <div style={{display: 'flex'}}>
        <div>
          <span><Image
            src={result.imgUrl}
            alt="Song art image"
            width={100}
            height={100}
            style={{
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          </span>
        </div>
        <div style={{paddingLeft: '1rem'}}>
          <h4 className={inter.className}>{result.title}</h4>
          <p className={inter.className}>{result.artist}</p>
          <p className={inter.className}>{result.year}</p>
        </div>
      </div>
    </Link>
    
  );

}