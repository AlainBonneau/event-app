import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import axios from "axios";

const Register = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Données envoyées:", formData);

    try {
      const response = await api.post("users/register", formData);
      console.log("Réponse API:", response.data);

      const token = response.data.token;
      const userId = response.data.userId;
      const role = response.data.role;

      if (!token || !userId) {
        setError("Erreur: Token ou ID utilisateur manquant.");
        return;
      }

      auth?.login(token, userId, role);
      navigate("/");
    } catch (error) {
      console.error("Erreur Axios:", error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Erreur lors de l'inscription."
        );
      } else {
        setError("Erreur lors de l'inscription.");
      }
    }
  };

  const isAuth = auth?.token;
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <section className="bg-gray-100 py-20 dark:bg-dark flex items-center justify-center min-h-screen">
      <div className="w-full max-w-[500px] bg-white dark:bg-dark-2 rounded-lg shadow-lg p-10 text-center">
        <h2 className="text-4xl font-bold text-dark dark:text-white mb-6">
          Inscription
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary dark:bg-dark-3 dark:text-white"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary dark:bg-dark-3 dark:text-white"
          />
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary dark:bg-dark-3 dark:text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary dark:bg-dark-3 dark:text-white"
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirmer le mot de passe"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary dark:bg-dark-3 dark:text-white"
          />
          <button
            type="submit"
            className="bg-primary text-white py-3 rounded-md hover:bg-primary-dark"
          >
            Inscription
          </button>
        </form>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Déjà inscrit ?{" "}
          <a href="/login" className="text-primary hover:underline">
            Connexion
          </a>
        </p>
      </div>
    </section>
  );
};

export default Register;
