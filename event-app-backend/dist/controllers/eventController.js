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
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = void 0;
const models_1 = require("../models");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, date, location, category, maxParticipants, createdBy, } = req.body;
        if (!title ||
            !description ||
            !date ||
            !location ||
            !category ||
            !maxParticipants ||
            !createdBy) {
            res.status(400).json({ message: "Tous les champs sont obligatoires" });
            return;
        }
        const createdEvent = yield models_1.Event.create({
            title,
            description,
            date,
            location,
            category,
            maxParticipants,
            createdBy,
        });
        res
            .status(200)
            .json({ message: "Événement créé avec succès", newEvent: createdEvent });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Erreur lors de la création d'un évènement", error });
        return;
    }
});
exports.createEvent = createEvent;
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEvents = yield models_1.Event.findAll();
        res.status(200).json({ message: "Voici tous les évènements", allEvents });
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des événements",
            error,
        });
        return;
    }
});
exports.getAllEvents = getAllEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = parseInt(req.params.id, 10);
        if (isNaN(eventId)) {
            res.status(400).json({ message: "ID d'événement invalide" });
            return;
        }
        const event = yield models_1.Event.findByPk(eventId);
        if (!event) {
            res.status(404).json({ message: "Événement introuvable" });
            return;
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de l'événement",
            error,
        });
    }
});
exports.getEventById = getEventById;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = parseInt(req.params.id, 10);
        const event = yield models_1.Event.findByPk(eventId);
        if (!event) {
            res.status(404).json({ message: "Evenement introuvable" });
            return;
        }
        if (isNaN(eventId)) {
            res.status(400).json({ message: "ID d'événement invalide" });
            return;
        }
        const { title, description, date, location, category, maxParticipants } = req.body;
        yield models_1.Event.update({ title, description, date, location, category, maxParticipants }, { where: { id: eventId } });
        const updatedEvent = yield models_1.Event.findByPk(eventId);
        res
            .status(200)
            .json({ message: "Evenement mis à jour", event: updatedEvent });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Erreur lors de la mise à jour de l'événement", error });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = parseInt(req.params.id, 10);
        if (isNaN(eventId)) {
            res.status(400).json({ message: "ID d'événement invalide" });
            return;
        }
        const event = yield models_1.Event.findByPk(eventId);
        if (!event) {
            res.status(404).json({ message: "Evenement introuvable" });
            return;
        }
        yield models_1.Event.destroy({ where: { id: eventId } });
        res.status(200).json({ message: "Evenement supprimé" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Erreur lors de la suppression de l'événement", error });
    }
});
exports.deleteEvent = deleteEvent;
