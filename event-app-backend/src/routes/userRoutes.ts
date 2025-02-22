import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getCurrentUser
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.get("/me", isAuthenticated, getCurrentUser)
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
