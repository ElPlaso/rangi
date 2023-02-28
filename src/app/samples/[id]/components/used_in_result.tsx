import Image from "next/image"
import styles from '@/app/styles/page.module.css'
import Sample from "@/app/models/sample"
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function UsedInResult(props: any) {

  const sample: Sample = props.sample || {};

  return (
    <Link href={`/samples/${sample.id}`} className={styles.card}>
        <div style={{display: 'flex'}}>
        <div>
            <span><Image
            src={sample.imgUrl}
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
            <h4 className={inter.className}>{sample.title}</h4>
            <p className={inter.className}>{sample.artist}</p>
            <p className={inter.className}>{sample.year}</p>
        </div>
        </div>
    </Link>
  );
}