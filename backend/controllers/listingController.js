import Listing from "../models/ListingModel.js";

/* CREATE LISTING */
export const createListing = async (req, res, next) => {
  console.log("REQ BODY 👉", req.body);
  try {
    if (!req.user?.id && !req.body.userRef) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const listing = await Listing.create({
      ...req.body,
      userRef: req.user?.id || req.body.userRef,
    });
    res.status(201).json({ listing });
  } catch (error) {
    console.error("CREATE LISTING ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getUserListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({
      userRef: req.params.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // check ownership
    if (listing.userRef.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await listing.deleteOne();

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // 🔐 ownership check (important)
    if (listing.userRef.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to edit this listing" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
