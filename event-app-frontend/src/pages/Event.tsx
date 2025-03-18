import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import api from "../api/axiosConfig";
import EventCard from "../components/EventCard";
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
        setEvents(response.data.allEvents);
      } catch (error) {
        console.error("Erreur lors du chargement des événements :", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="EventPage-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold text-primary pt-18 text-center"
      >
        Event'<span className="text-secondary">Go</span>
      </motion.h1>
      {(auth?.role === "admin" || auth?.role === "organisateur") && (
        <div className="btn-container flex items-center justify-end pr-4">
          <button
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg "
            onClick={() => navigate("/create-event")}
          >
            +
          </button>
        </div>
      )}
      <EventCard events={events} isLoading={false} />
    </div>
  );
};

export default EventPage;
