"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const participantController_1 = require("../controllers/participantController");
const router = express_1.default.Router();
router.get("/check", participantController_1.checkParticipation);
router.get("/:id", participantController_1.getParticipantByEvent);
router.get("/count/:eventId", participantController_1.countParticipantsByEvent);
router.post("/", participantController_1.registerToEvent);
router.delete("/:id", participantController_1.deleteParticipant);
router.delete("/", participantController_1.unregisterFromEvent);
exports.default = router;
