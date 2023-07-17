import Image from "next/image";
import styles from "@/styles/page.module.css";

export default function Splash() {
  return (
    <div className="w-full flex justify-center items-center space-x-4 h-[250px]">
      <div className="w-[75px] h-[75px] rounded-2xl shadow-lg flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-600">
        <Image
          src="/bird.png"
          alt="Music Notes icon"
          width={40}
          height={31}
          priority
          className="invert"
        />
      </div>
      <Image
        className={styles.logo}
        src="/rangi.png"
        alt="Rangi Logo"
        width={200}
        height={50}
        priority
      />
    </div>
  );
}
