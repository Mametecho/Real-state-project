import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { useEffect, useState } from "react";
import { clearError } from "../redux/user/userSlice";
import { signInUser } from "../redux/user/userThunk";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  if (currentUser) {
    console.log("User is logged in", currentUser);
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    dispatch(clearError());
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signInUser(formData)).unwrap();
      if (result.user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
      navigate("/sign-in");
    }
  };
  console.log("currentUser in SignIn:", currentUser);
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 dark:bg-slate-600">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 dark:bg-slate-500 dark:text-white">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Sign In
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 "
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            type="submit"
            className="bg-slate-900 text-white py-3 rounded-2xl font-semibold hover:bg-slate-800 transition "
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-px bg-slate-300" />
          <span className="text-sm text-slate-500 dark:text-white">OR</span>
          <div className="flex-1 h-px bg-slate-300" />
        </div>
        <OAuth />
        <p className="text-center text-slate-600 mt-6  dark:text-white">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-slate-900 font-semibold hover:underline "
          >
            Sign Up
          </Link>
        </p>
      </div>
      {error && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default SignIn;
