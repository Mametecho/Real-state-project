import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSuccess } from "../redux/user/userSlice";
import DeleteAccout from "../components/DeleteAccout";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "merm-state");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dd5myr4qp/image/upload",
        { method: "POST", body: data }
      );
      const json = await res.json();
      setFormData((prev) => ({ ...prev, avatar: json.secure_url }));
    } catch (err) {
      console.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.id) return alert("Please login again");

    setLoading(true);
    try {
      const res = await fetch(`/api/user/update/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(updateUserSuccess(data));
        alert("Profile updated successfully");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen bg-slate-100 dark:bg-slate-600 transition-colors ">
      <div className="p-8 max-w-lg mx-auto   ">
        <div className="bg-white  shadow-xl rounded-2xl p-8 dark:bg-slate-500 dark:text-white">
          <h1 className="text-3xl font-bold text-center mb-6 text-slate-800 dark:text-white">
            Profile
          </h1>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <input
              type="file"
              hidden
              ref={fileRef}
              accept="image/*"
              onChange={handleImageUpload}
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar}
              className="h-24 w-24 rounded-full object-cover cursor-pointer
                         ring-2 ring-slate-300 dark:ring-slate-600"
              alt="profile"
            />
            {uploading && (
              <p className="text-sm text-blue-500 mt-2">Uploading...</p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="input"
            />

            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />

            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password"
              className="input"
            />

            <button
              disabled={loading || uploading}
              className="bg-slate-800 dark:bg-blue-600
                         text-white p-3 rounded-lg uppercase font-semibold
                         hover:opacity-95 disabled:opacity-70 transition"
            >
              {loading ? "Updating..." : "Update Account"}
            </button>
          </form>

          <div
            className="flex justify-between mt-8 border-t
                          border-slate-200 dark:border-slate-700 pt-5"
          >
            <DeleteAccout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
