import { useState, useContext } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    maxParticipants: 0,
    createdBy: auth?.userId, // Assure que l'ID de l'utilisateur est inclus
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Fonction pour gérer les changements des inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: name === "maxParticipants" ? parseInt(value, 10) || 0 : value,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      console.log("Données envoyées à l'API :", event);

      await api.post("/events", event, {
        headers: { Authorization: `Bearer ${auth?.token}` }, // 🔥 Vérifie que le token est bien envoyé
      });

      setMessage("L'événement a bien été créé !");
      setEvent({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        maxParticipants: 0,
        createdBy: auth?.userId,
      });
      navigate("/events");
    } catch (error) {
      console.error("Erreur lors de la création de l'événement :", error);
      setMessage("Erreur lors de la création de l'événement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-25 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Créer un événement
      </h1>

      {message && <p className="text-center text-green-500">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={event.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={event.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="text"
          name="location"
          placeholder="Lieu"
          value={event.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <select
          name="category"
          value={event.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Sélectionnez une catégorie</option>
          <option value="Anniversaire">Anniversaire</option>
          <option value="Conférence">Conférence</option>
          <option value="Concert">Concert</option>
          <option value="Autre">Autre</option>
        </select>

        <input
          type="number"
          name="maxParticipants"
          placeholder="Nombre max de participants"
          value={event.maxParticipants}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Création en cours..." : "Créer l'événement"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
