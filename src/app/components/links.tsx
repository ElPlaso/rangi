"use client";
import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ReactElement } from "react";

export default function Links() {
  return (
    <div className="md:grid md:grid-cols-3 md:gap-x-3 sm:flex sm:flex-col md:space-y-0 sm:space-y-8 max-sm:space-y-8">
      <div className="flex flex-col items-center justify-center">
        <p className="text-opacity-50 dark:text-opacity-50 text-black dark:text-white">
          Made by
        </p>
        <a
          href="https://github.com/ElPlaso"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2"
        >
          <Image
            src="/el_plaso.svg"
            alt="Stool El Plaso Logo"
            className={styles.smallerLogo}
            width={100}
            height={25}
            priority
          />
        </a>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-opacity-50 dark:text-opacity-50 text-black dark:text-white">
          Powered by
        </p>
        <a
          href="https://rapidapi.com/Glavier/api/genius-song-lyrics1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="font-semibold">Genius</h3>
        </a>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-opacity-50 dark:text-opacity-50 text-black dark:text-white">
          Contribute or give feedback
        </p>
        <h3>
          <a
            href="https://github.com/ElPlaso/samplify_x/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </a>
        </h3>
      </div>
    </div>
  );
}
