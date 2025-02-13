import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController";

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
