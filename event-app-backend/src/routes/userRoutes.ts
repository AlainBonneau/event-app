import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getCurrentUser,
  updateProfile,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.get("/me", isAuthenticated, getCurrentUser);
router.put("/me/update", isAuthenticated, updateProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
