"use client";

import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import styles from "@/app/styles/page.module.css";
import StarredItem from "./starred_item";

export default function StarredList() {
  const starred = useSelector((state: RootState) => state.starred.items);

  return (
    <div className={styles.grid}>
      {starred.map((relation, index) => {
        return (
          <div key={index}>
            <StarredItem item={relation} />
          </div>
        );
      })}
    </div>
  );
}
