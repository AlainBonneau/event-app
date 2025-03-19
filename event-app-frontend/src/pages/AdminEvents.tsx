import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  maxParticipants: number;
}

const AdminPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (auth?.role !== "admin") {
      navigate("/404");
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setEvents(response.data.allEvents);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [auth?.token, auth?.role, navigate]);

  const handleDelete = async (eventId: number) => {
    if (!auth?.token) return;

    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet événement ?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/events/${eventId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setMessage("Événement supprimé avec succès !");
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setMessage("Erreur lors de la suppression.");
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <div className="text-center text-gray-600">Chargement...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        📊 Gestion des événements
      </h1>

      {message && <p className="text-center text-red-500">{message}</p>}

      {/* Barre de recherche et bouton ajouter */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Rechercher un événement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate("/create-event")}
        >
          ➕ Ajouter un événement
        </button>
      </div>

      {/* Mode TABLEAU pour les grands écrans */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Titre</th>
              <th className="py-3 px-6 text-left">Lieu</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Participants max</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredEvents.map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{event.title}</td>
                <td className="py-3 px-6">{event.location}</td>
                <td className="py-3 px-6">
                  {new Date(event.date).toLocaleDateString("fr-FR")}
                </td>
                <td className="py-3 px-6">{event.maxParticipants}</td>
                <td className="py-3 px-6 text-center flex gap-3">
                  <button
                    onClick={() => navigate(`/edit-event/${event.id}`)}
                    className="flex-1 w-12 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 w-12 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition cursor-pointer"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mode LISTE pour les petits écrans */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-dark-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-primary">
                {event.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">📍 {event.location}</p>
              <p className="text-gray-500 text-sm">
                📅 {new Date(event.date).toLocaleDateString("fr-FR")}
              </p>
              <p className="text-gray-700 text-sm font-semibold">
                👥 {event.maxParticipants} Participants max
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => navigate(`/edit-event/${event.id}`)}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucun événement trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
