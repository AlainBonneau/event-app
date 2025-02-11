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
    res.status(500).json({
      message: "Erreur survenu lors de la création de l'utilisateur",
      error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const verifyPassword = bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({ message: "Mauvais mot de passe" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );
    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur de la connexion de l'utilisateur", error });
  }
};
