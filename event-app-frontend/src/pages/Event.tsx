import { useState, useEffect, useContext } from "react";
import api from "../api/axiosConfig";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const EventPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/");

        if (!response || !response.data) {
          throw new Error("Réponse vide ou invalide");
        }

        console.log("API response:", response.data);

        setEvents(response.data.allEvents);
      } catch (error) {
        console.error("Erreur lors du chargement des événements :", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="EventPage-page">
      <h1 className="pt-18 text-center text-4xl">Événements</h1>
    {auth?.token && (
              <div className="btn-container flex items-center justify-end pr-4">
              <button
                className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg "
                onClick={() => navigate("/create-event")}
              >
                +
              </button>
            </div>
    )}
      <EventCard events={events} />
    </div>
  );
};

export default EventPage;
