import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { where } from "sequelize";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Cet utilisateur existe déjà." });
      return;
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
    return;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }

    const verifyPassword = bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      res.status(401).json({ message: "Mauvais mot de passe" });
      return;
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
    return;
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur de de la récupération du profil de l'utilisateur",
      error,
    });
    return;
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Non autorisé" });
    }

    res.status(200).json({
      id: req.user?.id,
      email: req.user?.email,
      role: req.user?.role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du profil", error });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Utilisateur non connecté" });
      return;
    }

    const { email, password } = req.body;
    const updatedData: { email?: string; password?: string } = {};

    if (email) {
      updatedData.email = email;
    }

    if (password) {
      const saltRounds = 10;
      updatedData.password = await bcrypt.hash(password, saltRounds);
    }

    await User.update(updatedData, { where: { id: req.user.id } });

    res.status(200).json({
      message: "Profil mis à jour avec succès",
      user: {
        id: req.user.id,
        email: email || req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du profil", error });
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Utilisateur non connecté" });
      return;
    }

    const user = req.user.id;

    const deletedUser = await User.destroy({ where: { id: user } });

    if (deletedUser === 0) {
      res.status(404).json({ message: "Compte introuvable " });
      return;
    }

    res.status(200).json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du compte", error });
  }
};
