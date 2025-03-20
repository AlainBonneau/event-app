import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";
import { isAdmin } from "../middlewares/authMiddleware";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", isAuthenticated, isAdmin, updateEvent);
router.post("/", isAuthenticated, isAdmin, createEvent);
router.delete("/:id", isAuthenticated, isAdmin, deleteEvent);

export default router;
