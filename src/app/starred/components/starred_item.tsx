import SampleRelation from "@/app/types/sample-relation";
import { Inter } from "@next/font/google";
import "@/app/styles/styles.css";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "@/app/features/starred/starred-slice";
import { RootState } from "@/app/store/store";
import StarredItemResult from "./starred_item_result";

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
      className="starred-item hovered shadowable"
      style={{ padding: "1rem 1.25rem" }}
    >
      <button onClick={handleRemove} className="star-icon">
        <StarIcon />
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 2fr",
          width: "100%",
        }}
      >
        <StarredItemResult result={item.sampler} />
        <div
          style={{
            opacity: 0.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 className={inter.className}>{"->"}</h2>
        </div>
        <StarredItemResult result={item.samplee} />
      </div>
    </div>
  );
}
