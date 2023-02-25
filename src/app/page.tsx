import SearchBar from './components/search_bar'
import Splash from './components/splash'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './styles/page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Splash />
      <div style={{ marginBottom: '3rem' }}>
        <SearchBar />
      </div>
    </>
  )
}
