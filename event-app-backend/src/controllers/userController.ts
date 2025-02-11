import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: "participant",
    });

    res
      .status(201)
      .json({ message: "Utilisateur créer avec succès", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur survenu lors de la création de l'utilisateur",
        error,
      });
  }
};
