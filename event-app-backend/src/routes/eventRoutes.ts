import express from "express";
import { createEvent, getAllEvents } from "../controllers/eventController";

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", createEvent);

export default router;
