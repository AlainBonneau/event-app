import express from "express";
import {
  registerToEvent,
  deleteParticipant,
  getParticipantByEvent,
} from "../controllers/participantController";

const router = express.Router();

router.get("/:id", getParticipantByEvent);
router.post("/", registerToEvent);
router.delete("/:id", deleteParticipant);

export default router;
