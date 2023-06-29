"use client";

import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import styles from "@/app/styles/page.module.css";
import StarredItem from "./starred_item";
import FlipMove from "react-flip-move";

export default function StarredList() {
  const starred = useSelector((state: RootState) => state.starred.items);

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
