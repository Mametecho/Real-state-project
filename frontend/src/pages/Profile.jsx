import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 mt-7">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
          Profile
        </h1>
        <div className="flex justify-center mb-6">
          <img
            src={currentUser?.avatar}
            alt="Profile"
            referrerPolicy="no-referrer"
            className="h-28 w-28 rounded-full object-cover ring-4 ring-slate-200 hover:ring-slate-400 transition cursor-pointer"
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Username</label>
            <input
              type="text"
              value={currentUser?.username}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-slate-50 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              type="email"
              value={currentUser?.email}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-slate-50 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Password</label>
            <input
              type="password"
              value="******** "
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-slate-50 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-8 space-y-3">
          <button className="w-full bg-slate-800 text-white py-2.5 rounded-lg hover:bg-slate-900 transition">
            Update Profile
          </button>

          <button className="w-full bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 transition">
            Create Listing
          </button>
        </div>
        <div className="mt-10 border-t pt-6 space-y-3">
          <button className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition">
            Delete Account
          </button>

          <button className="w-full bg-gray-200 text-slate-800 py-2.5 rounded-lg hover:bg-gray-300 transition">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
