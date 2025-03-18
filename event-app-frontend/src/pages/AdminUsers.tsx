import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

interface User {
  id: number;
  email: string;
  role: string;
}

const AdminUsers = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (auth?.role !== "admin") {
      navigate("/404");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await api.get("/users/all", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setUsers(response.data.allUsers);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
        setMessage("Impossible de récupérer les utilisateurs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [auth?.token, auth?.role, navigate]);

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?"))
      return;

    try {
      await api.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      setUsers(users.filter((user) => user.id !== userId));
      setMessage("Utilisateur supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      setMessage("Erreur lors de la suppression.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto pt-24 px-4">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Gestion des utilisateurs
      </h1>

      {/* Barre de recherche */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="w-full sm:w-64 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-2 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Message d'erreur ou de confirmation */}
      {message && (
        <p className="text-center text-red-500 font-semibold mb-4">{message}</p>
      )}

      {/* Loader */}
      {loading && (
        <div className="text-center text-gray-500">
          Chargement des utilisateurs...
        </div>
      )}

      {/* Mode TABLEAU sur écran large */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white dark:bg-dark-2 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Rôle</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-dark-3 transition"
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-red-500 text-white"
                        : user.role === "organisateur"
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mode pour mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-dark-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary">
                  {user.email}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.role === "admin"
                      ? "bg-red-500 text-white"
                      : user.role === "organisateur"
                      ? "bg-green-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2">ID: {user.id}</p>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full"
              >
                Supprimer
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Aucun utilisateur trouvé.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
