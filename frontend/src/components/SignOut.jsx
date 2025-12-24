import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/user/userThunk";
import { FiLogOut } from "react-icons/fi";
const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/sign-in");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <button
      className="bg-gray-200 text-slate-800 py-2.5 rounded-lg hover:bg-gray-300 transition px-4 mt-4 font-semibold"
      onClick={handleLogout}
    >
      <FiLogOut size={25} />
    </button>
  );
};

export default SignOut;
