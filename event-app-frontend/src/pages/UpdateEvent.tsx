import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
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

const UpdateEvent = () => {
  const auth = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (auth?.role !== "admin") {
      navigate("/404");
      return;
    }

    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setEvent(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [auth?.token, auth?.role, navigate, id]);

  const handleUpdate = async () => {
    if (!auth?.token || !event) return;

    try {
      await api.put(`/events/${event.id}`, event, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setMessage("✅ Événement modifié avec succès !");
      navigate(`/events/${event.id}`);
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      setMessage("❌ Une erreur est survenue.");
    }
  };

  if (loading) return <p className="text-center pt-10">Chargement...</p>;
  if (!event)
    return (
      <p className="text-center pt-10 text-red-500">Événement introuvable.</p>
    );

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-dark-2 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        Modifier l'événement
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Titre
          </label>
          <input
            type="text"
            id="title"
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={event.description}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="date" className="block font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={event.date.slice(0, 10)}
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="location" className="block font-medium mb-1">
            Lieu
          </label>
          <input
            type="text"
            id="location"
            value={event.location}
            onChange={(e) => setEvent({ ...event, location: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Catégorie
          </label>
          <select
            id="category"
            value={event.category}
            onChange={(e) => setEvent({ ...event, category: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="sport">Sport</option>
            <option value="culture">Culture</option>
            <option value="divertissement">Divertissement</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="maxParticipants" className="block font-medium mb-1">
            Participants max
          </label>
          <input
            type="number"
            id="maxParticipants"
            value={event.maxParticipants}
            onChange={(e) =>
              setEvent({ ...event, maxParticipants: parseInt(e.target.value) })
            }
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-primary text-white py-3 rounded-md hover:bg-blue-600 transition"
        >
          Enregistrer les modifications
        </button>

        {message && (
          <p className="text-center text-sm mt-4 text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdateEvent;
