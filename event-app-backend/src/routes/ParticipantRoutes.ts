import express from "express";
import {
  registerToEvent,
  deleteParticipant,
  getParticipantByEvent,
  countParticipantsByEvent,
  unregisterFromEvent,
  checkParticipation,
} from "../controllers/participantController";

const router = express.Router();

router.get("/check", checkParticipation);
router.get("/count/:eventId", countParticipantsByEvent);
router.get("/:id", getParticipantByEvent);
router.post("/", registerToEvent);
router.delete("/:id", deleteParticipant);
router.delete("/", unregisterFromEvent);

export default router;
