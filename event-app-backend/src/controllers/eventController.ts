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
    return;
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allEvents = await Event.findAll();
    res.status(200).json({ message: "Voici tous les évènements", allEvents });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des événements",
      error,
    });
    return;
  }
};

export const getEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const eventId = parseInt(req.params.id, 10);

    if (isNaN(eventId)) {
      res.status(400).json({ message: "ID d'événement invalide" });
      return;
    }

    const event = await Event.findByPk(eventId);

    if (!event) {
      res.status(404).json({ message: "Événement introuvable" });
      return;
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'événement",
      error,
    });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const eventId = parseInt(req.params.id, 10);
    const event = await Event.findByPk(eventId);

    if (!event) {
      res.status(404).json({ message: "Evenement introuvable" });
      return;
    }

    if (isNaN(eventId)) {
      res.status(400).json({ message: "ID d'événement invalide" });
      return;
    }

    const { title, description, date, location, category, maxParticipants } =
      req.body;

    await Event.update(
      { title, description, date, location, category, maxParticipants },
      { where: { id: eventId } }
    );

    const updatedEvent = await Event.findByPk(eventId);
    res
      .status(200)
      .json({ message: "Evenement mis à jour", event: updatedEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'événement", error });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const eventId = parseInt(req.params.id);

    if (isNaN(eventId)) {
      res.status(400).json({ message: "ID d'événement invalide" });
      return;
    }

    const event = await Event.findByPk(eventId);

    if (!event) {
      res.status(404).json({ message: "Evenement introuvable" });
      return;
    }

    await Event.destroy({ where: { id: eventId } });
    res.status(200).json({ message: "Evenement supprimé" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'événement", error });
  }
};
