import SampleRelation from "@/app/types/sample-relation";
import styles from "@/app/styles/page.module.css";
import Image from "next/image";
import { Inter } from "@next/font/google";
import "@/app/styles/styles.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton } from "@mui/material";
import { Star as StarIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "@/app/features/starred/starred-slice";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function StarredItem(props: { item: SampleRelation }) {
  const starred = useSelector((state: RootState) => state.starred.items);
  const item = props.item;
  const router = useRouter();
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

  const handleCardClick = () => {
    router.push(`/samples/${item.sampler.id}`);
  };

  return (
    <div
      className={`${styles.card} starred-item`}
      onClick={handleCardClick}
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        cursor: "pointer",
      }}
    >
      <IconButton onClick={handleRemove} className="star-icon">
        <StarIcon />
      </IconButton>

      <div className="sample-result" style={{ width: "100%" }}>
        <Image
          src={item.sampler.imgUrl}
          alt="Cover Art"
          width={75}
          height={75}
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #eaeaea",
            marginTop: "0.5rem",
          }}
        />
        <div className="sample-result-text" style={{ marginTop: "0.5rem" }}>
          <h4 className={inter.className}>{item.sampler.title}</h4>
          <p className={inter.className}>{item.sampler.artist}</p>
          <p className={inter.className}>{item.sampler.year}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "0.5rem",
          alignItems: "center",
          opacity: 0.15,
        }}
      >
        <div
          style={{
            border: "1px solid",
            height: "1px",
            width: "100%",
          }}
        />
        <ExpandMoreIcon />
      </div>
      <div className="sample-result" style={{ width: "100%" }}>
        <Image
          src={item.samplee.imgUrl}
          alt="Cover Art"
          width={75}
          height={75}
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #eaeaea",
            marginTop: "0.5rem",
          }}
        />
        <div className="sample-result-text" style={{ marginTop: "0.5rem" }}>
          <h4 className={inter.className}>{item.samplee.title}</h4>
          <p className={inter.className}>{item.samplee.artist}</p>
          <p className={inter.className}>{item.samplee.year}</p>
        </div>
      </div>
    </div>
  );
}
