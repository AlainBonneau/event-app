import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("users/login", formData);
      const token = response.data.token;
      const userId = response.data.userId;
      const role = response.data.role;

      auth?.login(token, userId, role);
      localStorage.setItem("userId", userId.toString());
      navigate("/");
    } catch (e) {
      console.error(e);
      setError("Email ou mot de passe incorrect.");
    }
  };

  const isAuth = auth?.token;
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <section className="bg-gray-100 py-20 dark:bg-dark flex flex-col items-center justify-center min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold text-primary pb-8"
      >
        Event'<span className="text-secondary">Go</span>
      </motion.h1>
      <div className="w-full max-w-[500px] bg-white dark:bg-dark-2 rounded-lg shadow-lg p-10 text-center">
        <h2 className="text-4xl font-bold text-dark dark:text-white mb-6">
          Connexion
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
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary dark:bg-dark-3 dark:text-white"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-blue-600 transition"
          >
            Connexion
          </button>
        </form>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Pas encore inscrit ?{" "}
          <Link to="/register" className="text-primary hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
