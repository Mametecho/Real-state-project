import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import listingReducer from "./listing/listingSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    listing: listingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
