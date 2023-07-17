import { configureStore } from "@reduxjs/toolkit";
import starredReducer, { setItems } from "@/lib/features/starred/starred-slice";

export const store = configureStore({
  reducer: {
    starred: starredReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      (store) => (next) => (action) => {
        let result = next(action);

        // update local storage after reducer has handled action
        if (
          [
            "starred/setItems",
            "starred/addItem",
            "starred/removeItem",
          ].includes(action.type)
        ) {
          localStorage.setItem(
            "starredItems",
            JSON.stringify(store.getState().starred.items)
          );
        }

        return result;
      }
    ),
});

// Dispatch an action to initialize state from local storage after store creation
if (typeof window !== "undefined") {
  const localStorageStarredItems = localStorage.getItem("starredItems");
  if (localStorageStarredItems) {
    store.dispatch(setItems(JSON.parse(localStorageStarredItems)));
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
