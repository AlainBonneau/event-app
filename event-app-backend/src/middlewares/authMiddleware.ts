import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: "ID introuvable" });
      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }

    if (user?.role === "admin") {
      next();
      return;
    }

    res.status(403).json({ message: "Accès interdit : administrateur requis" });
  } catch (error) {
    res.status(500).json({ message: "Erreur d'authentification", error });
  }
};
