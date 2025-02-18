import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.patch("/:id", updateEvent);
router.post("/", createEvent);
router.delete("/:id", deleteEvent);

export default router;
