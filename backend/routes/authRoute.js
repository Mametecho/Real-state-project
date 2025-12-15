import express from "express";
import { login, SignUp } from "../controllers/authController.js";

const router = express.Router();

// Define user-related routes here
router.post("/sign-up", SignUp);
router.post("/sign-in", login);

export default router;
