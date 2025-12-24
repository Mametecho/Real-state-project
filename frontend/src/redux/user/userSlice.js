import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAccount,
  googleSignIn,
  logoutUser,
  signInUser,
  signUpUser,
} from "./userThunk";
import { sanitizeUserState } from "../../utils/sanitizeUserState.js";

const savedUserState = sanitizeUserState();

const initialState = {
  currentUser: savedUserState?.currentUser ?? null,
  token: savedUserState?.token ?? null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.currentUser = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("userState");
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== SIGN UP ===== */
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        // Check if the user object exists in payload to prevent setting null
        if (action.payload && action.payload.user) {
          state.currentUser = action.payload.user;
          state.token = action.payload.token ?? null;
          state.error = null;
          localStorage.setItem(
            "userState",
            JSON.stringify({
              currentUser: state.currentUser,
              token: state.token,
            })
          );
        }
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== SIGN IN ===== */
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.user) {
          state.currentUser = action.payload.user;
          state.token = action.payload.token ?? null;
          state.error = null;
          localStorage.setItem(
            "userState",
            JSON.stringify({
              currentUser: state.currentUser,
              token: state.token,
            })
          );
        }
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== GOOGLE SIGN-IN ===== */
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.user) {
          state.currentUser = action.payload.user;
          state.token = action.payload.token ?? null;
          state.error = null;
          localStorage.setItem(
            "userState",
            JSON.stringify({
              currentUser: state.currentUser,
              token: state.token,
            })
          );
        }
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== LOGOUT ===== */
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.token = null;
        state.loading = false;
        state.error = null;
        localStorage.removeItem("userState");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.currentUser = null;
        state.token = null;
        state.loading = false;
        state.error = null;
        localStorage.removeItem("userState");
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { signOut, clearError, updateAvatar, updateUserSuccess } =
  userSlice.actions;
export default userSlice.reducer;
