"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const models_1 = require("../models");
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(400).json({ message: "ID utilisateur introuvable" });
            return;
        }
        const user = yield models_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "Utilisateur introuvable" });
            return;
        }
        if (user.role && user.role.toLowerCase() === "admin") {
            return next();
        }
        res.status(403).json({ message: "Accès interdit : administrateur requis" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Erreur d'authentification", error });
        return;
    }
});
exports.isAdmin = isAdmin;
