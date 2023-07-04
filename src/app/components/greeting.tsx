"use client";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const getTime = () => {
  const date = new Date();
  const hours = date.getHours();

  return hours;
};

export default function Greeting() {
  const time = getTime();
  return (
    <h1 className={inter.className}>
      Good{" "}
      {time >= 6 && time < 18 ? (
        <>morning</>
      ) : time >= 18 && time < 24 ? (
        <>evening</>
      ) : (
        <>night</>
      )}
    </h1>
  );
}
