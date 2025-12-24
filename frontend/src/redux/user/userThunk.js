import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../../firebase";

// Helper function to normalize the response data
const normalizeUserData = (data) => {
  // If backend returns { user: {...}, token: "..." }
  if (data.user) {
    return {
      user: data.user,
      token: data.token || null,
    };
  }
  // If backend returns the user object directly { name: "...", token: "..." }
  return {
    user: data,
    token: data.token || null,
  };
};

/* ===== SIGN UP ===== */
export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (formData, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Sign-up failed");
      }

      return normalizeUserData(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* ===== SIGN IN ===== */
export const signInUser = createAsyncThunk(
  "user/signIn",
  async (formData, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Sign-in failed");
      }

      return normalizeUserData(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* ===== GOOGLE SIGN-IN ===== */
export const googleSignIn = createAsyncThunk(
  "user/googleSignIn",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid,
          avatar: result.user.photoURL,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Google sign-in failed");
      }

      return normalizeUserData(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ===== LOGOUT ===== */
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await fetch("/api/auth/signout", {
        method: "GET",
        credentials: "include",
      });

      localStorage.removeItem("userState");

      return { user: null, token: null };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);
/* ===== DELETE ACCOUNT ===== */
export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (_, thunkAPI) => {
    try {
      await fetch("/api/user/delete-account/:id", {
        method: "DELETE",
        credentials: "include",
      });

      localStorage.removeItem("userState");

      return { user: null, token: null };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete account failed"
      );
    }
  }
);
