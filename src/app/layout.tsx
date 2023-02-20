import './styles/globals.css'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './styles/page.module.css'
import SearchBar from './components/search_bar'

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
          {children}
        </main>
      </body>
    </html>
  )
}
