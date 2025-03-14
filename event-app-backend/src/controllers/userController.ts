import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, lastname, firstname, password } = req.body;

    if (!email || !password || !lastname || !firstname) {
      res.status(400).json({ message: "Tous les champs sont obligatoires." });
      return;
    }

    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Format d'email invalide." });
      return;
    }

    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
      });
      return;
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Cet email est déjà utilisé." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      lastname,
      firstname,
      password: hashedPassword,
      role: "participant",
    });

    const token = jwt.sign(
      { id: newUser.id, email },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    res
      .status(201)
      .json({ message: "Inscription réussie", token, userId: newUser.id });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ message: "Erreur serveur", error });
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

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      res.status(401).json({ message: "Mauvais mot de passe" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );
    res.status(200).json({
      message: "Connexion réussie",
      token,
      userId: user.id,
      role: user.role,
    });
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
      lastname: req.user?.lastname,
      firstname: req.user?.firstname,
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

    const { email, password, lastname, firstname } = req.body;
    const updatedData: {
      email?: string;
      password?: string;
      lastname?: string;
      firstname?: string;
    } = {};

    if (email) {
      updatedData.email = email;
    }

    if (lastname) {
      updatedData.lastname = lastname;
    }

    if (firstname) {
      updatedData.firstname = firstname;
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
        lastname: lastname || req.user.lastname,
        firstname: firstname || req.user.firstname,
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
