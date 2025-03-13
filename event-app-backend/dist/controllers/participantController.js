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
exports.checkParticipation = exports.unregisterFromEvent = exports.countParticipantsByEvent = exports.getParticipantByEvent = exports.deleteParticipant = exports.registerToEvent = void 0;
const models_1 = require("../models");
const registerToEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, eventId } = req.body;
        const user = yield models_1.User.findByPk(userId);
        const event = yield models_1.Event.findByPk(eventId);
        if (!user || !event) {
            res
                .status(404)
                .json({ message: "Utilisateur et/ou événement introuvable" });
            return;
        }
        const participantCount = yield models_1.Participant.count({ where: { eventId } });
        if (participantCount >= event.maxParticipants) {
            res.status(403).json({ message: "L'événement est complet." });
            return;
        }
        const userAlreadyParticipant = yield models_1.Participant.findOne({
            where: { userId, eventId },
        });
        if (userAlreadyParticipant) {
            res.status(409).json({ message: "Vous êtes déjà inscrit." });
            return;
        }
        yield models_1.Participant.create({ userId, eventId });
        res.status(201).json({ message: "Inscription réussie !" });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur lors de l'inscription", error });
    }
});
exports.registerToEvent = registerToEvent;
const deleteParticipant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, eventId } = req.body;
        const user = yield models_1.User.findByPk(userId);
        const event = yield models_1.Event.findByPk(eventId);
        if (!user || !event) {
            res
                .status(404)
                .json({ message: "Utilisateur et/ou événement introuvable" });
            return;
        }
        const isUserRegistered = yield models_1.Participant.findOne({
            where: { userId, eventId },
        });
        if (!isUserRegistered) {
            res
                .status(404)
                .json({ message: "L'utilisateur n'est pas inscrit à cet événement" });
            return;
        }
        yield models_1.Participant.destroy({ where: { userId, eventId } });
        res.status(200).json({ message: "Participant supprimé" });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la désinscription de l'événement",
            error,
        });
    }
});
exports.deleteParticipant = deleteParticipant;
const getParticipantByEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = parseInt(req.params.id, 10);
        if (isNaN(eventId)) {
            res.status(400).json({ message: "ID invalide" });
            return;
        }
        const event = yield models_1.Event.findByPk(eventId);
        if (!event) {
            res.status(404).json({ message: "Evénement introuvable" });
            return;
        }
        const allParticipants = yield models_1.Participant.findAll({
            where: { eventId },
            include: [{ model: models_1.User, attributes: ["id", "email"] }],
        });
        res.status(200).json({ participants: allParticipants });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des participants",
            error,
        });
    }
});
exports.getParticipantByEvent = getParticipantByEvent;
const countParticipantsByEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = parseInt(req.params.eventId, 10);
        if (isNaN(eventId)) {
            res.status(400).json({ message: "ID d'événement invalide" });
            return;
        }
        const event = yield models_1.Event.findByPk(eventId);
        if (!event) {
            res.status(404).json({ message: "Événement introuvable" });
            return;
        }
        const participantCount = yield models_1.Participant.count({ where: { eventId } });
        res.status(200).json({ eventId, participantCount });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Erreur lors du comptage des participants", error });
    }
});
exports.countParticipantsByEvent = countParticipantsByEvent;
const unregisterFromEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, eventId } = req.body;
        const user = yield models_1.User.findByPk(userId);
        const event = yield models_1.Event.findByPk(eventId);
        if (!user || !event) {
            res
                .status(404)
                .json({ message: "Utilisateur et/ou événement introuvable" });
            return;
        }
        const participation = yield models_1.Participant.findOne({
            where: { userId, eventId },
        });
        if (!participation) {
            res
                .status(404)
                .json({ message: "L'utilisateur n'est pas inscrit à cet événement" });
            return;
        }
        yield models_1.Participant.destroy({ where: { userId, eventId } });
        res.status(200).json({ message: "Désinscription réussie" });
    }
    catch (error) {
        console.error("Erreur lors de la désinscription :", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la désinscription", error });
    }
});
exports.unregisterFromEvent = unregisterFromEvent;
const checkParticipation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.query.userId, 10);
        const eventId = parseInt(req.query.eventId, 10);
        if (isNaN(userId) || isNaN(eventId)) {
            res.status(400).json({ message: "Données invalides" });
            return;
        }
        const isParticipating = yield models_1.Participant.findOne({
            where: { userId, eventId },
        });
        res.status(200).json({ isParticipating: !!isParticipating });
    }
    catch (error) {
        console.error("Erreur lors de la vérification de la participation :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.checkParticipation = checkParticipation;
