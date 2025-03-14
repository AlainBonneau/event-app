import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";
import axios from "axios";
import MyModal from "../components/MyModal";

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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [isParticipated, setIsParticipated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    const checkParticipation = async () => {
      if (!auth?.token || !auth.userId || !id) return;

      const eventId = parseInt(id, 10);

      try {
        const response = await api.get(`participants/check`, {
          params: { userId: auth.userId, eventId },
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setIsParticipated(response.data.isParticipating);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la participation :",
          error
        );
      }
    };

    checkParticipation();
  }, [auth?.token, auth?.userId, id]);

  const handleRegister = async () => {
    if (!auth?.token || !auth.userId) {
      setMessage("Vous devez être connecté pour vous inscrire.");
      return;
    }

    try {
      const response = await api.post(
        `participants`,
        { eventId: event?.id, userId: auth.userId },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      setMessage(response.data.message);
      setIsParticipated(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message || "Erreur lors de l'inscription."
        );
      } else {
        setMessage("Erreur lors de l'inscription.");
      }
    }
  };

  const handleUnregister = async () => {
    if (!auth?.token || !auth.userId) {
      setMessage("Vous devez être connecté pour vous désinscrire.");
      return;
    }

    try {
      const response = await api.delete(`participants`, {
        headers: { Authorization: `Bearer ${auth.token}` },
        data: { eventId: event?.id, userId: auth.userId },
      });

      setMessage(response.data.message);
      setIsParticipated(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message || "Erreur lors de la désinscription."
        );
      } else {
        setMessage("Erreur lors de la désinscription.");
      }
    }
  };

  const handleDelete = async () => {
    if (!auth?.token) {
      setMessage("Vous devez être connecté en tant qu'admin.");
      return;
    }

    try {
      await api.delete(`/events/${event?.id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setMessage("Événement supprimé avec succès !");
      navigate("/events");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement :", error);
      setMessage("Erreur lors de la suppression.");
    }
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading)
    return <div className="text-center text-gray-600">Chargement...</div>;
  if (!event)
    return (
      <div className="text-center text-red-500">Événement introuvable.</div>
    );

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
        <div className="flex items-center justify-between">
          <span className="bg-secondary text-white text-sm font-bold px-3 py-1 rounded-full">
            {event.category}
          </span>
          {auth?.role === "admin" && (
            <button
              onClick={handleConfirmDelete}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg"
            >
              x
            </button>
          )}
        </div>
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
        {/* L'utilisateur est il inscrit ? */}
        {isParticipated ? (
          <p className="text-green-500">Vous êtes inscrit à cet événement</p>
        ) : (
          <p className="text-red-500">
            Vous n'êtes pas inscrit à cet événement
          </p>
        )}

        {/* Message d'inscription */}
        {message && <p className="text-center text-red-500 mt-2">{message}</p>}

        {/* Affichage conditionnel des boutons */}
        {isParticipated ? (
          <button
            onClick={handleUnregister}
            className="mt-4 w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-md shadow-md 
    transition-all duration-300 hover:bg-red-600 active:scale-95"
          >
            Se désinscrire
          </button>
        ) : (
          <button
            onClick={handleRegister}
            className="mt-6 w-full bg-primary text-white font-semibold py-3 px-6 rounded-md shadow-md 
    transition-all duration-300 hover:bg-blue-600 active:scale-95"
          >
            S'inscrire
          </button>
        )}
      </div>
      <MyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
        description="Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible."
      />
    </div>
  );
};

export default EventDetail;
