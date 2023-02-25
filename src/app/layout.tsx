import './styles/globals.css'
import styles from './styles/page.module.css'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from "next/link"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main className={styles.main}>
          <div className={styles.description}>
            <p>
              <Link href={`/`} >
                <Image
                  className={styles.logo}
                  src="/samplify.svg"
                  alt="Samplify X Logo"
                  width={150}
                  height={25}
                  priority
                />
              </Link>
            </p>
            <div style={{
              display: 'flex',
            }}>
              <a
                href="https://docs.genius.com/"
                target="_blank"
                rel="noopener noreferrer"

                style={{ marginRight: '2rem' }}
              >
                <h2 className={inter.className}>
                  Genius API
                </h2>
              </a>
              <a
                href="https://github.com/ElPlaso"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/el_plaso.svg"
                  alt="Stool El Plaso Logo"
                  className={styles.smallerLogo}
                  width={125}
                  height={25}
                  priority
                />
              </a>
            </div>

          </div>
          {children}
        </main>
      </body>
    </html>
  )
}
