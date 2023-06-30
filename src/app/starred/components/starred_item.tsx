import SampleRelation from "@/app/types/sample-relation";
import Image from "next/image";
import { Inter } from "@next/font/google";
import "@/app/styles/styles.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { IconButton } from "@mui/material";
import { Star as StarIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "@/app/features/starred/starred-slice";
import { RootState } from "@/app/store/store";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function StarredItem(props: { item: SampleRelation }) {
  const starred = useSelector((state: RootState) => state.starred.items);
  const item = props.item;
  const dispatch = useDispatch();

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const index: number = starred.findIndex((relation) => {
      return (
        relation.sampler.id === item.sampler.id &&
        relation.samplee.id === item.samplee.id
      );
    });
    dispatch(removeItem(index));
  };

  return (
    <div
      className="starred-item cardish hovered"
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <IconButton onClick={handleRemove} className="star-icon">
        <StarIcon />
      </IconButton>

      <div className="sample-result" style={{ width: "100%" }}>
        <Image
          src={item.sampler.imgUrl}
          alt="Cover Art"
          width={100}
          height={100}
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #eaeaea",
            marginTop: "0.5rem",
          }}
        />
        <div className="sample-result-text" style={{ marginTop: "0.5rem" }}>
          <Link href={`/samples/${item.sampler.id}`}>
            <h4 className={`${inter.className} textLink`}>
              {item.sampler.title}
            </h4>
          </Link>
          <p className={inter.className}>{item.sampler.artist}</p>
          <p className={inter.className}>{item.sampler.year}</p>
        </div>
      </div>
      <ArrowDownwardIcon style={{ opacity: 0.5 }} />
      <div className="sample-result" style={{ width: "100%" }}>
        <Image
          src={item.samplee.imgUrl}
          alt="Cover Art"
          width={100}
          height={100}
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #eaeaea",
            marginTop: "0.5rem",
          }}
        />
        <div className="sample-result-text" style={{ marginTop: "0.5rem" }}>
          <Link href={`/samples/${item.samplee.id}`}>
            <h4 className={`${inter.className} textLink`}>
              {item.samplee.title}
            </h4>
          </Link>
          <p className={inter.className}>{item.samplee.artist}</p>
          <p className={inter.className}>{item.samplee.year}</p>
        </div>
      </div>
    </div>
  );
}
