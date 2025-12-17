import express from "express";
import { google, login, SignUp } from "../controllers/authController.js";

const router = express.Router();

// Define user-related routes here
router.post("/sign-up", SignUp);
router.post("/sign-in", login);
router.post("/google", google);

export default router;
