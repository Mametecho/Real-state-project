import { createAsyncThunk } from "@reduxjs/toolkit";

/* MULTIPLE IMAGE UPLOAD */
export const uploadListingImages = createAsyncThunk(
  "listing/uploadImages",
  async (files, thunkAPI) => {
    try {
      const uploadPromises = Array.from(files).map((file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "merm-state");

        return fetch("https://api.cloudinary.com/v1_1/dd5myr4qp/image/upload", {
          method: "POST",
          body: data,
        }).then((res) => res.json());
      });

      const results = await Promise.all(uploadPromises);

      return results.map((img) => img.secure_url);
    } catch (error) {
      return thunkAPI.rejectWithValue("Image upload failed");
    }
  }
);
export const createListingThunk = createAsyncThunk(
  "listing/createListing",
  async (listingData, thunkAPI) => {
    try {
      const response = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(listingData),
      });
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data.listing;
    } catch (error) {
      return thunkAPI.rejectWithValue("Listing creation failed");
    }
  }
);
/* GET USER LISTINGS */
export const fetchMyListings = createAsyncThunk(
  "listing/fetchMyListings",
  async (userId, thunkAPI) => {
    try {
      const res = await fetch(`/api/listing/user/${userId}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch listings");
    }
  }
);

/* DELETE LISTING */
export const deleteListingThunk = createAsyncThunk(
  "listing/deleteListing",
  async (listingId, thunkAPI) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      return listingId;
    } catch {
      return thunkAPI.rejectWithValue("Delete failed");
    }
  }
);
/* UPDATE LISTING */
export const updateListingThunk = createAsyncThunk(
  "listing/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/listing/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchListingById = createAsyncThunk(
  "listing/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/listing/${id}`);

      // Check if the response is actually okay (200-299)
      if (!res.ok) {
        throw new Error("Failed to fetch listing");
      }

      const data = await res.json(); // Use .json() instead of .data
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch listing");
    }
  }
);
