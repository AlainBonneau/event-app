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
        setEvent(response.data.event);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [auth?.token, auth?.role, navigate, event, id]);

  const handleUpdate = async () => {
    if (!auth?.token || !event) return;

    try {
      await api.put(`/events/${event.id}`, event, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setMessage("Événement modifié avec succès !");
    } catch (error) {
      console.error("Erreur lors de la modification de l'événement :", error);
    }
  };

  if (loading) return <p>Chargement en cours...</p>;

  if (!event) return <p>Événement introuvable.</p>;

  return (
    <div>
      <h2>Modifier l'événement</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
        />
        <label htmlFor="location">Lieu</label>
        <input
          type="text"
          id="location"
          value={event.location}
          onChange={(e) => setEvent({ ...event, location: e.target.value })}
        />
        <label htmlFor="category">Catégorie</label>
        <select
          id="category"
          value={event.category}
          onChange={(e) => setEvent({ ...event, category: e.target.value })}
        >
          <option value="sport">Sport</option>
          <option value="culture">Culture</option>
          <option value="divertissement">Divertissement</option>
        </select>
        <label htmlFor="maxParticipants">Participants max</label>
        <input
          type="number"
          id="maxParticipants"
          value={event.maxParticipants}
          onChange={(e) =>
            setEvent({
              ...event,
              maxParticipants: parseInt(e.target.value),
            })
          }
        />
        <button type="submit">Modifier</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateEvent;
