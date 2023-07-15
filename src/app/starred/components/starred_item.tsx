import SampleRelation from "@/app/types/sample-relation";
import "@/app/styles/styles.css";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "@/app/features/starred/starred-slice";
import { RootState } from "@/app/store/store";
import StarredItemResult from "./starred_item_result";
import { useRouter } from "next/navigation";

export default function StarredItem(props: { item: SampleRelation }) {
  const starred = useSelector((state: RootState) => state.starred.items);
  const item = props.item;
  const dispatch = useDispatch();
  const router = useRouter();

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

  const onItemClick = () => {
    router.push(`/compare/${item.sampler.id}/${item.samplee.id}`);
  };

  return (
    <div
      className="starred-item hovered shadowable"
      onClick={onItemClick}
      style={{ padding: "1rem 1.25rem", cursor: "pointer" }}
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
          <h2>{"->"}</h2>
        </div>
        <StarredItemResult result={item.samplee} />
      </div>
    </div>
  );
}
