import { configureStore } from "@reduxjs/toolkit";
import nobinReducer from "./nobinslice";
export const store = configureStore({
  reducer: {
    nobbin: nobinReducer,
  },
});
