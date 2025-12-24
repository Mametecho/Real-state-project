import { createSlice } from "@reduxjs/toolkit";
import {
  createListingThunk,
  deleteListingThunk,
  fetchListingById,
  fetchMyListings,
  updateListingThunk,
  uploadListingImages,
} from "./listingThunk.js";

const initialState = {
  listings: [],
  images: [],
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    resetListing(state) {
      state.images = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* IMAGE UPLOAD */
      .addCase(uploadListingImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadListingImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(uploadListingImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CREATE LISTING */
      .addCase(createListingThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createListingThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createListingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* FETCH */
      .addCase(fetchMyListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
        console.log("Payload received in Slice:", action.payload);
      })
      .addCase(fetchMyListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteListingThunk.fulfilled, (state, action) => {
        state.listings = state.listings.filter((l) => l._id !== action.payload);
      })
      /* UPDATE */
      .addCase(updateListingThunk.fulfilled, (state, action) => {
        state.listings = state.listings.map((l) =>
          l._id === action.payload._id ? action.payload : l
        );
      })
      /* FETCH SINGLE LISTING */
      .addCase(fetchListingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListingById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleListing = action.payload;
        state.images = action.payload?.imageUrls || [];
      })
      .addCase(fetchListingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetListing } = listingSlice.actions;
export default listingSlice.reducer;
