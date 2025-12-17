import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { googleSignIn } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const onGoogleClick = async () => {
    dispatch(googleSignIn());
    navigate("/");
  };
  return (
    <button
      disabled={loading}
      onClick={onGoogleClick}
      type="button"
      className="w-full flex items-center justify-center gap-3 border border-slate-300 py-3 rounded-lg hover:bg-slate-100 transition"
    >
      <FcGoogle size={20} />
      <span className="font-medium text-slate-700">
        {" "}
        {loading ? "Signing in..." : "Sign in with Google"}
      </span>
    </button>
  );
};

export default OAuth;
