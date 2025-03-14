"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount =
  exports.updateProfile =
  exports.getCurrentUser =
  exports.getUserProfile =
  exports.loginUser =
  exports.registerUser =
    void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const registerUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { email, lastname, firstname, password } = req.body;
      if (!email || !password || !lastname || !firstname) {
        res.status(400).json({ message: "Tous les champs sont obligatoires." });
        return;
      }
      const existingUser = yield User_1.default.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: "Cet email est déjà utilisé." });
        return;
      }
      const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
      const newUser = yield User_1.default.create({
        email,
        lastname,
        firstname,
        password: hashedPassword,
        role: "participant",
      });
      const token = jsonwebtoken_1.default.sign(
        { id: newUser.id, email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      res
        .status(201)
        .json({ message: "Inscription réussie", token, userId: newUser.id });
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      res.status(500).json({ message: "Erreur serveur", error });
    }
  });
exports.registerUser = registerUser;
const loginUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { email, password } = req.body;
      const user = yield User_1.default.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({ message: "Utilisateur introuvable" });
        return;
      }
      const verifyPassword = yield bcryptjs_1.default.compare(
        password,
        user.password
      );
      if (!verifyPassword) {
        res.status(401).json({ message: "Mauvais mot de passe" });
        return;
      }
      const token = jsonwebtoken_1.default.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      res
        .status(200)
        .json({
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
  });
exports.loginUser = loginUser;
const getUserProfile = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.params;
      const user = yield User_1.default.findByPk(id, {
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
  });
exports.getUserProfile = getUserProfile;
const getCurrentUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
      if (!req.user) {
        res.status(401).json({ message: "Non autorisé" });
      }
      res.status(200).json({
        id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        email: (_b = req.user) === null || _b === void 0 ? void 0 : _b.email,
        lastname:
          (_c = req.user) === null || _c === void 0 ? void 0 : _c.lastname,
        firstname:
          (_d = req.user) === null || _d === void 0 ? void 0 : _d.firstname,
        role: (_e = req.user) === null || _e === void 0 ? void 0 : _e.role,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du profil", error });
    }
  });
exports.getCurrentUser = getCurrentUser;
const updateProfile = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Utilisateur non connecté" });
        return;
      }
      const { email, password, lastname, firstname } = req.body;
      const updatedData = {};
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
        updatedData.password = yield bcryptjs_1.default.hash(
          password,
          saltRounds
        );
      }
      yield User_1.default.update(updatedData, { where: { id: req.user.id } });
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
  });
exports.updateProfile = updateProfile;
const deleteAccount = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Utilisateur non connecté" });
        return;
      }
      const user = req.user.id;
      const deletedUser = yield User_1.default.destroy({ where: { id: user } });
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
  });
exports.deleteAccount = deleteAccount;
