"use client";
import Image from "next/image";
import styles from "@/app/styles/page.module.css";
import "@/app/styles/styles.css";
import Result from "@/app/types/result";
import { Inter } from "@next/font/google";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../features/starred/starred-slice";
import { RootState } from "../store/store";
import { alreadyStarred } from "../features/starred/utils";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
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
  const [resultIsStarred, setResultIsStarred] = useState(false);
  const [showStar, setShowStar] = useState(false);

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

  const handlePlayClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    router.push(`/compare/${parent!.id}/${result.id}`);
  };

  // The Tooltip library relies on client-side rendering, so we need to wait for the client to render
  // otherwise the initial ui will not match what was rendered on the server causing Hydration failure
  useEffect(() => {
    setShowStar(true);
  }, []);

  useEffect(() => {
    if (parent) {
      setResultIsStarred(
        alreadyStarred(starred, { sampler: parent, samplee: result })
      );
    }
  }, [starred]);

  return (
    <div
      id={result.id}
      onClick={handleCardClick}
      className={`${styles.card} sample-result shadowable`}
      style={{ cursor: "pointer" }}
    >
      {showStar && parent && (
        <div className="sample-result-icon">
          <>
            {resultIsStarred ? (
              <button onClick={handleUnstar} className="star-icon">
                <a
                  data-tooltip-id={`${result.id} star`}
                  data-tooltip-content={"Unstar"}
                >
                  <StarIcon style={{ paddingTop: 2 }} />
                </a>
              </button>
            ) : (
              <button onClick={handleStar} className="star-icon">
                <a
                  data-tooltip-id={`${result.id} star`}
                  data-tooltip-content={"Star"}
                >
                  <StarBorderIcon style={{ paddingTop: 2 }} />
                </a>
              </button>
            )}

            <button onClick={handlePlayClick} className="play-icon">
              <a
                data-tooltip-id={`${result.id} play`}
                data-tooltip-content={"Compare"}
              >
                <PlayArrowOutlinedIcon />
              </a>
            </button>
            <Tooltip
              className={inter.className}
              id={`${result.id} star`}
              place="left"
            />
            <Tooltip
              className={inter.className}
              id={`${result.id} play`}
              place="left"
            />
          </>
        </div>
      )}

      <div>
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
      </div>
      <div
        className="sample-result-text"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        <h4 className={inter.className}>{result.title}</h4>
        <p className={inter.className}>{result.artist}</p>
        <p className={inter.className}>{result.year}</p>
      </div>
    </div>
  );
}
