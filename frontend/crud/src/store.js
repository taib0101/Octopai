import { configureStore } from "@reduxjs/toolkit";

import itemsReducer from "./features/itemsSlice";

const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

export default store;
