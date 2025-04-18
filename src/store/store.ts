import { configureStore } from "@reduxjs/toolkit";
import { uiStateName } from "./ui/types";
import { uiReducer } from "./ui";

const store = configureStore({
  reducer: {
    [uiStateName]: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
