import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    regularPrice: {
      type: Number,
      required: [true, "Price is required"],
    },
    discountedPrice: {
      type: Number,
    },
    bathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["rent", "sale"],
      required: [true, "Type is required"],
    },
    imageUrls: {
      type: [String],
      required: [true, "At least one image URL is required"],
    },
    ownerOccupied: {
      type: Boolean,
      default: false,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
