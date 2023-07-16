import SampleRelation from "@/app/types/sample-relation";
import "@/app/styles/styles.css";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "@/app/features/starred/starred-slice";
import { RootState } from "@/app/store/store";
import StarredItemResult from "./starred_item_result";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
      className="starred-item hovered shadowable p-4 cursor-pointer"
      onClick={onItemClick}
    >
      <button onClick={handleRemove} className="star-icon">
        <StarIcon />
      </button>

      <div className="flex items-center justify-center space-x-4 w-full">
        <StarredItemResult result={item.sampler} />
        <ArrowForwardIcon />
        <StarredItemResult result={item.samplee} />
      </div>
    </div>
  );
}
