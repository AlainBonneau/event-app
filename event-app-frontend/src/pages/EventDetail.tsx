import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  maxParticipants: number;
  createdBy: number;
}

const EventDetail = () => {
    const auth = useContext(AuthContext);
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de l'URL
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuth = auth?.token;
  if (!isAuth) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/events/${id}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-600">Chargement...</div>;
  }

  if (!event) {
    return (
      <div className="text-center text-red-500">Événement introuvable.</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Bouton Retour */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 transition"
      >
        ⬅ Retour
      </button>

      <div className="bg-white dark:bg-dark-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8">
        {/* Catégorie */}
        <span className="bg-secondary text-white text-sm font-bold px-3 py-1 rounded-full">
          {event.category}
        </span>

        {/* Titre */}
        <h1 className="text-3xl font-bold text-primary mt-4">{event.title}</h1>

        {/* Date & Lieu */}
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
          📍 {event.location} | 📅{" "}
          {new Date(event.date).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          {event.description}
        </p>

        {/* Participants */}
        <p className="text-gray-700 dark:text-gray-400 mt-2 text-lg font-semibold">
          👥 {event.maxParticipants} Participants max
        </p>

        {/* Bouton S'inscrire */}
        <button
          className="mt-6 w-full bg-primary text-white font-semibold py-3 px-6 rounded-md shadow-md 
          transition-all duration-300 hover:bg-blue-600 active:scale-95"
        >
          S'inscrire à cet événement
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
