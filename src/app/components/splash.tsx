import Image from 'next/image'
import styles from '../styles/page.module.css'

export default function Splash() {
  return (
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
  )
}