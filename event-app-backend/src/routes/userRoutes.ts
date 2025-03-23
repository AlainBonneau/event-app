import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getCurrentUser,
  updateProfile,
  updateUser,
  deleteAccount,
  getAllUsers,
  deleteUser,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.get("/me", isAuthenticated, getCurrentUser);
router.get("/all", isAuthenticated, isAdmin, getAllUsers);
router.put("/me/update", isAuthenticated, updateProfile);
router.put("/:id", isAuthenticated, isAdmin, updateUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/me/delete", isAuthenticated, deleteAccount);
router.delete("/:id", isAuthenticated, isAdmin, deleteUser);

export default router;
