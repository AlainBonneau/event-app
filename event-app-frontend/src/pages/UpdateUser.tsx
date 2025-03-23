import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";

interface User {
  id: number;
  name: string;
  email: string;
}

const UpdateUser = () => {
  const auth = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (auth?.role !== "admin") {
      navigate("/404");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/profile/${id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [auth?.token, auth?.role, navigate, id]);

  const handleUpdate = async () => {
    if (!auth?.token || !user) return;

    try {
      await api.put(`/users/${user.id}`, user, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setMessage("✅ Utilisateur modifié avec succès !");
      navigate(`/users/${user.id}`);
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      setMessage("❌ Une erreur est survenue.");
    }
  };

  return (
    <div className="container mx-auto max-w-xl mt-16 px-4">
      {loading && <p className="text-center text-gray-500">Chargement...</p>}

      {user && (
        <div className="bg-white dark:bg-dark-2 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Modifier l'utilisateur
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Nom :
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Email :
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Modifier
            </button>
          </form>

          {message && (
            <p className="text-center mt-4 text-sm text-gray-600">{message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
