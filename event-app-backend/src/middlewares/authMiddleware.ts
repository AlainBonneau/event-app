import { Request, Response, NextFunction } from "express";
import { User } from "../models";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ message: "ID utilisateur introuvable" });
      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }

    if (user.role && user.role.toLowerCase() === "admin") {
      return next();
    }

    res.status(403).json({ message: "Accès interdit : administrateur requis" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Erreur d'authentification", error });
    return;
  }
};
