import express from "express";
import { registerToEvent } from "../controllers/participantController";

const router = express.Router();

router.post("/", registerToEvent);

export default router;
