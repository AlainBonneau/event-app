import express from "express";
import {
  registerToEvent,
  deleteParticipant,
  getParticipantByEvent,
  countParticipantsByEvent
} from "../controllers/participantController";

const router = express.Router();

router.get("/:id", getParticipantByEvent);
router.get("/count/:eventId")
router.post("/", registerToEvent);
router.delete("/:id", deleteParticipant);

export default router;
