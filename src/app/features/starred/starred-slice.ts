import { RootState } from "@/app/store/store";
import SampleRelation from "@/app/types/sample-relation";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StarredState {
  items: SampleRelation[];
}

const initialState: StarredState = {
  items: [],
};

export const starredSlice = createSlice({
  name: "starred",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<SampleRelation[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<SampleRelation>) => {
      state.items = [...state.items, action.payload];
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
  },
});

export const { setItems, addItem, removeItem } = starredSlice.actions;

export const selectStarred = (state: RootState) => state.starred.items;

export default starredSlice.reducer;
