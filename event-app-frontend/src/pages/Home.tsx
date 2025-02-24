import { useState, useEffect } from "react";
import api from "../api/axiosConfig";

interface Event {
  id: number;
  title: string;
  description: string;
}

const Home = () => {
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tous les événements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event: Event) => (
          <div key={event.id} className="border p-4">
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
