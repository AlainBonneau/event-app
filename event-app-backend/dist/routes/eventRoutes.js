"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
router.get("/", eventController_1.getAllEvents);
router.get("/:id", eventController_1.getEventById);
router.put("/:id", isAuthenticated_1.isAuthenticated, authMiddleware_1.isAdmin, eventController_1.updateEvent);
router.post("/", isAuthenticated_1.isAuthenticated, authMiddleware_1.isAdmin, eventController_1.createEvent);
router.delete("/:id", isAuthenticated_1.isAuthenticated, authMiddleware_1.isAdmin, eventController_1.deleteEvent);
exports.default = router;
