import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import EventCard from "../components/EventCard";

const EventPage = () => {
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
  }, [events]);

  return (
    <div className="EventPage-page">
      <h1 className="pt-18 text-center text-4xl">Événements</h1>
      {/* <EventCard events={events} /> */}
    </div>
  );
};

export default EventPage;
