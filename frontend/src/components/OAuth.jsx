import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleSignIn } from "../redux/user/userThunk";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const onGoogleClick = async () => {
    try {
      // ✅ wait for success
      await dispatch(googleSignIn()).unwrap();

      // ✅ navigate ONLY after successful login
      navigate("/");
    } catch (error) {
      // ❌ stay on page if error
      console.error("Google sign-in failed:", error);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={onGoogleClick}
      type="button"
      className="w-full flex items-center justify-center gap-3 border border-slate-300 py-3 rounded-2xl hover:bg-slate-100 transition"
    >
      <FcGoogle size={20} />
      <span className="font-medium text-slate-700 dark:text-white ">
        {" "}
        {loading ? "Signing in..." : "Sign in with Google"}
      </span>
    </button>
  );
};

export default OAuth;
