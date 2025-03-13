"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
router.get("/profile/:id", userController_1.getUserProfile);
router.get("/me", isAuthenticated_1.isAuthenticated, userController_1.getCurrentUser);
router.put("/me/update", isAuthenticated_1.isAuthenticated, userController_1.updateProfile);
router.post("/register", userController_1.registerUser);
router.post("/login", userController_1.loginUser);
router.delete("/me/delete", isAuthenticated_1.isAuthenticated, userController_1.deleteAccount);
exports.default = router;
