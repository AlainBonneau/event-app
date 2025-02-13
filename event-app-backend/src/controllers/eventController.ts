import { Request, Response } from "express";
import { Event } from "../models";

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description,
      date,
      location,
      category,
      maxParticipants,
      createdBy,
    } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !location ||
      !category ||
      !maxParticipants ||
      !createdBy
    ) {
      res.status(400).json({ message: "Tous les champs sont obligatoire" });
      return;
    }

    const createdEvent = await Event.create({
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
      .json({ message: "Event créer avec succès", newEvent: createdEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création d'un évènement", error });
  }
};
