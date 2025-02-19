import { Request, Response } from "express";
import { Participant, Event, User } from "../models";

export const registerToEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, eventId } = req.body;
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(eventId);

    if (!user || !event) {
      res
        .status(404)
        .json({ message: "Utilisateur et/ou événement introuvable" });
      return;
    }

    const participantCount = await Participant.count({ where: { eventId } });

    if (participantCount >= event.maxParticipants) {
      res.status(403).json({
        message: "L'événement a atteint son nombre maximum de participants",
      });
      return;
    }

    const userAlreadyParticipant = await Participant.findOne({
      where: { userId, eventId },
    });

    if (userAlreadyParticipant) {
      res.status(409).json({ message: "Utilisateur déjà inscrit" });
      return;
    }

    await Participant.create({ userId, eventId });

    res.status(201).json({ message: "Utilisateur inscrit avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'inscription à l'événement", error });
  }
};

export const deleteParticipant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, eventId } = req.body;
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(eventId);

    if (!user || !event) {
      res
        .status(404)
        .json({ message: "Utilisateur et/ou événement introuvable" });
      return;
    }

    const isUserRegistered = await Participant.findOne({
      where: { userId, eventId },
    });

    if (!isUserRegistered) {
      res
        .status(404)
        .json({ message: "L'utilisateur n'est pas inscrit à cet événement" });
      return;
    }

    await Participant.destroy({ where: { userId, eventId } });

    res.status(200).json({ message: "Participant supprimé" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la désinscription de l'événement",
      error,
    });
  }
};

export const getParticipantByEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const eventId = parseInt(req.params.id, 10);

    if (isNaN(eventId)) {
      res.status(400).json({ message: "ID invalide" });
      return;
    }

    const event = await Event.findByPk(eventId);

    if (!event) {
      res.status(404).json({ message: "Evénement introuvable" });
      return;
    }

    const allParticipants = await Participant.findAll({
      where: { eventId },
      include: [{ model: User, attributes: ["id", "email"] }],
    });

    res.status(200).json({ participants: allParticipants });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des participants",
      error,
    });
  }
};

export const countParticipantsByEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const eventId = parseInt(req.params.eventId, 10);

    if (isNaN(eventId)) {
      res.status(400).json({ message: "ID d'événement invalide" });
      return;
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      res.status(404).json({ message: "Événement introuvable" });
      return;
    }

    const participantCount = await Participant.count({ where: { eventId } });

    res.status(200).json({ eventId, participantCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors du comptage des participants", error });
  }
};
