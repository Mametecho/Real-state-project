import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Welcome Back
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
          />

          <button
            type="submit"
            className="bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-px bg-slate-300" />
          <span className="text-sm text-slate-500">OR</span>
          <div className="flex-1 h-px bg-slate-300" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-slate-300 py-3 rounded-lg hover:bg-slate-100 transition"
        >
          <FcGoogle size={20} />
          <span className="font-medium text-slate-700">
            Continue with Google
          </span>
        </button>

        <p className="text-center text-slate-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-slate-900 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
