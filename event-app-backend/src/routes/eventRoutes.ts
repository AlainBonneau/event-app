import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";
import { isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", isAdmin, updateEvent);
router.post("/", isAdmin, createEvent);
router.delete("/:id", isAdmin, deleteEvent);

export default router;
