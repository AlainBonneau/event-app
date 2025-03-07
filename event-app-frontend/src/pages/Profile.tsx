import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface User {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  role: string;
  createdAt: string;
}

const Profile = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditing, setIsEditing] = useState(false); // TODO: Gérer l'édition du profil
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!auth?.token || !auth.userId) {
        navigate("/login");
        return;
      }
      try {
        const response = await api.get(`users/profile/${auth.userId}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [auth?.token, auth?.userId, navigate]);

  if (loading) {
    return <div className="text-center text-gray-600">Chargement...</div>;
  }

  if (!user) {
    return (
      <div className="text-center text-red-500">
        Impossible de récupérer le profil.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl p-10 text-center w-full max-w-lg flex flex-col items-center"
      >
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-gray-700 dark:text-gray-300 shadow-md">
            {user.email.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Infos utilisateur */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Profil
        </h1>
        <div className="space-y-4 text-left w-full">
          <div className="input-container lg:flex gap-6">
            <div className="w-full">
              <label className="block">
                <span className="text-gray-700 dark:text-gray-300">
                  Email :
                </span>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full mt-1 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white shadow-sm"
                />
              </label>

              <label className="block mt-3">
                <span className="text-gray-700 dark:text-gray-300">
                  Prénom :
                </span>
                <input
                  type="text"
                  value={user.firstname}
                  disabled
                  name="firstname"
                  className="w-full mt-1 p-3 border rounded-lg shadow-sm"
                />
              </label>
            </div>

            <div className="w-full">
              <label className="block">
                <span className="text-gray-700 dark:text-gray-300">Nom :</span>
                <input
                  type="text"
                  name="lastname"
                  value={user.lastname}
                  disabled
                  className="w-full mt-1 p-3 border rounded-lg shadow-sm"
                />
              </label>

              <label className="block mt-3">
                <span className="text-gray-700 dark:text-gray-300">Rôle :</span>
                <input
                  type="text"
                  name="role"
                  value={user.role}
                  disabled
                  className="w-full mt-1 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white shadow-sm"
                />
              </label>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
            Inscrit depuis le{" "}
            <span className="font-semibold">
              {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </div>

        {/* Boutons */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg">
            Modifier le profil
          </button>
          <button
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 shadow-lg"
            onClick={auth?.logout}
          >
            Se déconnecter
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
