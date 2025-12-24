import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMyListings,
  deleteListingThunk,
} from "../redux/listing/listingThunk";

const ShowMyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { listings, loading } = useSelector((state) => state.listing);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchMyListings(currentUser.id));
    }
  }, [dispatch, currentUser]);

  const handleDelete = (id) => {
    if (confirm("Delete this listing?")) {
      dispatch(deleteListingThunk(id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">My Listings</h1>
          <button
            onClick={() => navigate("/create-listing")}
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg"
          >
            ➕ Create Listing
          </button>
        </div>

        {listings.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow text-center">
            <p className="text-slate-500 dark:text-slate-400">
              No listings yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr className="text-left">
                  <th className="p-4">Image</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Beds</th>
                  <th className="p-4">Baths</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                {listings.map((l) => (
                  <tr
                    key={l._id}
                    className="hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    <td className="p-4">
                      <img
                        src={l.imageUrls?.[0]}
                        alt=""
                        className="w-20 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-4 font-semibold dark:text-white">
                      {l.name}
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-300">
                      {l.address}
                    </td>
                    <td className="p-4">🛏 {l.bedrooms}</td>
                    <td className="p-4">🛁 {l.bathrooms}</td>
                    <td className="p-4 font-bold text-emerald-600">
                      ${l.regularPrice}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => navigate(`/listing/${l._id}`)}
                          className="bg-blue-600 text-white px-4 py-1 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(l._id)}
                          className="bg-red-600 text-white px-4 py-1 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowMyList;
