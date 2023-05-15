import "./styles/globals.css";
import styles from "./styles/page.module.css";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Link from "next/link";
import SideNavigation from "./components/side_navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
          <SideNavigation />
          <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
