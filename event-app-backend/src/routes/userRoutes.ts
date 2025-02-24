import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getCurrentUser,
  updateProfile,
  deleteAccount,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.get("/me", isAuthenticated, getCurrentUser);
router.put("/me/update", isAuthenticated, updateProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/me/delete", isAuthenticated, deleteAccount);

export default router;
