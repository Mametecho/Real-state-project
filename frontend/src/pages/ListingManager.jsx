import React from "react";
import { useNavigate } from "react-router-dom";

const ListingManager = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-600 transition-colors px-4">
      <div className="p-8 max-w-lg w-full bg-white dark:bg-gray-500 dark:text-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-10 text-slate-800 dark:text-white">
          Manage Listings
        </h1>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => navigate("/create-listing")}
            className="bg-emerald-600 text-white p-4 rounded-xl text-lg font-bold 
              hover:bg-emerald-700 shadow-lg transition-all transform hover:scale-105"
          >
            ➕ Create New Listing
          </button>

          <button
            onClick={() => navigate("/manage-listing")}
            className="bg-blue-600 text-white p-4 rounded-xl text-lg font-bold 
              hover:bg-blue-700 shadow-lg transition-all transform hover:scale-105"
          >
            📂 Show My Listings
          </button>
        </div>

        <div
          className="mt-10 bg-slate-50 dark:bg-gray-700 p-6 rounded-2xl border border-dashed 
          border-slate-300 dark:border-gray-600"
        >
          <p className="text-center text-slate-500 dark:text-gray-300 italic">
            "Manage your real estate inventory and track your active posts
            here."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingManager;
