"use client";
import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import Result from "@/app/types/result";
import { Inter } from "@next/font/google";
import { IconButton } from "@mui/material";
import {
  StarBorder as StarBorderIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../features/starred/starred-slice";
import { RootState } from "../store/store";
import { alreadyStarred } from "../features/starred/utils";
const inter = Inter({ subsets: ["latin"] });

interface SampleResultProps {
  result: Result;
  parent?: Result;
}

export default function SampleResult(props: SampleResultProps) {
  const result: Result = props.result;
  const parent: Result | undefined = props.parent;
  const router = useRouter();
  const dispatch = useDispatch();
  const starred = useSelector((state: RootState) => state.starred.items);

  const handleStar = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (parent) {
      dispatch(addItem({ sampler: parent, samplee: result }));
    }
  };

  const handleUnstar = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (parent) {
      const index: number = starred.findIndex((relation) => {
        return (
          relation.sampler.id === parent.id && relation.samplee.id === result.id
        );
      });
      dispatch(removeItem(index));
    }
  };

  const handleCardClick = () => {
    router.push(`/samples/${result.id}`);
  };

  return (
    <div
      id={result.id}
      onClick={handleCardClick}
      className={`${styles.card} sample-result`}
      style={{ cursor: "pointer" }}
    >
      {parent && (
        <div className="sample-result-icon">
          {parent &&
            (alreadyStarred(starred, { sampler: parent, samplee: result }) ? (
              <IconButton onClick={handleUnstar} className="star-icon">
                <StarIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleStar} className="star-icon">
                <StarBorderIcon />
              </IconButton>
            ))}
        </div>
      )}
      <div>
        <span>
          <Image
            src={result.imgUrl}
            alt="Cover Art"
            width={100}
            height={100}
            style={{
              objectFit: "cover",
              borderRadius: "5px",
              border: "1px solid #eaeaea",
            }}
          />
        </span>
      </div>
      <div className="sample-result-text">
        <h4 className={inter.className}>{result.title}</h4>
        <p className={inter.className}>{result.artist}</p>
        <p className={inter.className}>{result.year}</p>
      </div>
    </div>
  );
}
