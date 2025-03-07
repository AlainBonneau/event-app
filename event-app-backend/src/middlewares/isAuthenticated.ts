import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Authentification requise" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded !== "object" || !("id" in decoded)) {
      res.status(401).json({ message: "Token invalide" });
      return;
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      res.status(401).json({ message: "Utilisateur non trouvé" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Erreur d'authentification", error });
  }
};
