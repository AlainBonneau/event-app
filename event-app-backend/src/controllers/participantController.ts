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
