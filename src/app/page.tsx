import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import SearchBar from './search_bar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>

        <a
          href="https://github.com/ElPlaso"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/el_plaso.svg"
            alt="Stool El Plaso Logo"
            className={styles.smallerLogo}
            width={100}
            height={24}
            priority
          />
        </a>
        <a
          href="https://docs.genius.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Genius
          </h2>
        </a>
      </div>
      <div className={styles.center}>
        <div className={styles.icon}>
          <Image src="/music_notes.svg" alt="Music Notes icon" width={40} height={31} priority />
        </div>
        <Image
          className={styles.logo}
          src="/samplify.svg"
          alt="Samplify X Logo"
          width={200}
          height={50}
          priority
        />
      </div>
      <div>
        <SearchBar />
      </div>
    </main>
  )
}
