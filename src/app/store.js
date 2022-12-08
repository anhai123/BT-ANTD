import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "../feature/heroSlice";

const reducer = {
  hero: heroReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
