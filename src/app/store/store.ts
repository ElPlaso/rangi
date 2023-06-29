import { configureStore } from "@reduxjs/toolkit";
import starredSlice from "@/app/features/starred/starred-slice";

export const store = configureStore({
  reducer: {
    starred: starredSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
