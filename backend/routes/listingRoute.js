import express from "express";
import {
  createListing,
  deleteListing,
  getListingById,
  getUserListings,
  updateListing,
} from "../controllers/listingController.js";
import verifyToken from "../utils/verfiyToken.js";

const router = express.Router();

// Define listing-related routes here
router.post("/create", verifyToken, createListing);
router.get("/user/:id", verifyToken, getUserListings);
router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/:id", verifyToken, getListingById);
router.put("/update/:id", verifyToken, updateListing);

export default router;
