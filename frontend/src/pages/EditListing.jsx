import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  uploadListingImages,
  updateListingThunk,
  fetchListingById,
} from "../redux/listing/listingThunk";

const EditListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // listing ID from URL
  const { singleListing, images, loading } = useSelector(
    (state) => state.listing
  );
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    regularPrice: "",
    discountedPrice: "",
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    ownerOccupied: false,
    type: "rent",
  });

  // Load existing listing data
  useEffect(() => {
    const loadListing = async () => {
      try {
        // FIXED: Call the Thunk function (fetchListingById) and pass the id
        const listing = await dispatch(fetchListingById(id)).unwrap();

        setFormData({
          name: listing.name || "",
          address: listing.address || "",
          description: listing.description || "",
          regularPrice: listing.regularPrice || 0,
          discountedPrice: listing.discountedPrice || 0,
          bedrooms: listing.bedrooms || 1,
          bathrooms: listing.bathrooms || 1,
          furnished: listing.furnished || false,
          parking: listing.parking || false,
          ownerOccupied: listing.ownerOccupied || false,
          type: listing.type || "rent",
        });
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      }
    };

    if (id) {
      loadListing();
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    dispatch(uploadListingImages(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please wait for images to upload or upload at least one image.");
      return;
    }

    dispatch(
      updateListingThunk({
        id, // listing id
        data: {
          ...formData,
          imageUrls: images,
          userRef: currentUser._id,
        },
      })
    ).then(() => navigate("/manage-listing"));
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-600 py-10 px-4 transition-colors">
      <div className="max-w-4xl mx-auto bg-slate-200 dark:bg-gray-500 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-black">
          Edit Listing
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 text-gray-800 dark:text-white"
        >
          {/* BASIC INFO */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <input
                name="name"
                placeholder="Listing title"
                className="input focus:outline-none"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                name="address"
                placeholder="Address"
                className="input"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              rows="4"
              className="input mt-4 w-full"
              value={formData.description}
              onChange={handleChange}
            />
          </section>

          {/* PRICING */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="regularPrice"
                type="number"
                placeholder="Regular price"
                className="input"
                value={formData.regularPrice}
                onChange={handleChange}
              />
              <input
                name="discountedPrice"
                type="number"
                placeholder="Discounted price"
                className="input"
                value={formData.discountedPrice}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* DETAILS */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="bedrooms"
                type="number"
                min="1"
                placeholder="Bedrooms"
                className="input"
                value={formData.bedrooms}
                onChange={handleChange}
              />
              <input
                name="bathrooms"
                type="number"
                min="1"
                placeholder="Bathrooms"
                className="input"
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* FEATURES */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Features</h2>
            <div className="flex flex-wrap gap-6">
              {[
                ["furnished", "Furnished"],
                ["parking", "Parking"],
                ["ownerOccupied", "Owner occupied"],
              ].map(([name, label]) => (
                <label
                  key={name}
                  className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name={name}
                    className="accent-blue-600 w-4 h-4"
                    checked={formData[name]}
                    onChange={handleChange}
                  />
                  {label}
                </label>
              ))}
            </div>
          </section>

          {/* TYPE & IMAGE */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div>
              <h2 className="text-lg font-semibold mb-2">Listing Type</h2>
              <select
                name="type"
                className="input w-full"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Upload Images</h2>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="input w-full"
              />
            </div>
          </section>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
