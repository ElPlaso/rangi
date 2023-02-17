import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by searching for a song.
        </p>
        <div>
          <a
            href="https://github.com/ElPlaso"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/el_plaso.svg"
              alt="Stool El Plaso Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/samplify.svg"
          alt="Samplify X Logo"
          width={300}
          height={100}
          priority
        />
        <div className={styles.icon}>
          <Image src="/music_notes.svg" alt="Music Notes icon" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://docs.genius.com/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Genius API <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Learn about the API used to find samples.
          </p>
        </a>
      </div>
    </main>
  )
}
