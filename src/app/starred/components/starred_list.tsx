"use client";

import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import StarredItem from "./starred_item";
import FlipMove from "react-flip-move";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function StarredList() {
  const starred = useSelector((state: RootState) => state.starred.items);

  if (starred.length === 0) {
    return (
      <div className="cardish hovered">
        <p className={inter.className}>You do not have any starred samples.</p>
      </div>
    );
  }

  return (
    <FlipMove
      className={styles.grid}
      duration={750}
      easing="ease-out"
      typeName="ul"
    >
      {starred.map((relation) => {
        const key = `${relation.sampler.id}-${relation.samplee.id}`;
        return (
          <div key={key}>
            <StarredItem item={relation} />
          </div>
        );
      })}
    </FlipMove>
  );
}
