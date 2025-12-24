import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../redux/user/userThunk";

const DeleteAccout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleDeleteAccount = async () => {
    try {
      if (!currentUser?.id) {
        alert("User ID not found. Please log in again.");
        return;
      }
      const result = await dispatch(deleteAccount(currentUser.id)).unwrap();
      if (result.message) {
        alert("Account deleted successfully.");
      }
      if (result) {
        navigate("/sign-up");
      }
    } catch (err) {
      console.error("Account deletion failed:", err);
    }
  };
  return (
    <button
      className="bg-red-400 text-white py-2.5 rounded-xl hover:bg-red-600 transition px-4 mt-4 w-full font-semibold "
      onClick={handleDeleteAccount}
    >
      Delete Account
    </button>
  );
};

export default DeleteAccout;
