import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-dark-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8 text-center w-[80%] max-w-lg">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-700">
            {user.email.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Infos utilisateur */}
        <h1 className="text-3xl font-bold text-primary mt-4">{user.email}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Rôle :{" "}
          <span className="font-semibold text-secondary">
            {user.role.toUpperCase()}
          </span>
        </p>
        {/* <p className="text-gray-700 dark:text-gray-300 mt-4">
        {user.firstname} {user.lastname}
        </p> */}
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Prénom / Nom :{" "}
          <span className="text-gray-700 dark:text-gray-300 mt-4">
            {user.firstname} {user.lastname}
          </span>
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          Inscrit depuis le{" "}
          <span className="font-semibold">
            {new Date(user.createdAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>

        {/* Boutons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-blue-600 transition"
            onClick={() => navigate("/edit-profile")}
          >
            Modifier le profil
          </button>
          <button
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
            onClick={auth?.logout}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
