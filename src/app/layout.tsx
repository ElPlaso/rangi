import "./styles/globals.css";
import styles from "./styles/page.module.css";
import SideNavigation from "./components/side_navigation";
import LayoutWrapper from "./components/layout-wrapper";

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
        <LayoutWrapper>
          <SideNavigation />
          <main className={styles.main}>{children}</main>
        </LayoutWrapper>
      </body>
    </html>
  );
}
