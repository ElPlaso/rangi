import "./styles/globals.css";
import styles from "./styles/page.module.css";
import SideNavigation from "./components/side_navigation";
import LayoutWrapper from "./components/layout-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samplify",
  description: "A search tool for exploring the world of music through samples. Find samples used in your favorite songs and albums & Discover songs which sample your favourite songs.",
  icons: "/favicon.ico",
  viewport: "width=device-width, initial-scale=1",
  twitter: {
    card: "summary",
    site: "@samplify",
    title: "Samplify",
    images: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://samplify.vercel.app",
    title: "Samplify",
    images: [
      {
        url: "/favicon.ico",
        width: 800,
        height: 600,
        alt: "Samplify",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
