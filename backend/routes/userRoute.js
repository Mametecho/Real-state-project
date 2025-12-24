import express from "express";
import {
  deleteAccount,
  updateAvatar,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// Define user-related routes here
router.put("/update-avatar", updateAvatar);
router.put("/update/:id", updateUser);
router.delete("/delete-account/:id", deleteAccount);

export default router;
