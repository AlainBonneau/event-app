import React from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  maxParticipants: number;
}

interface EventCardProps {
  events: Event[];
}

const EventCard: React.FC<EventCardProps> = ({ events }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Tous les événements
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-dark-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105"
            >
              {/* Catégorie */}
              <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                {event.category}
              </span>

              {/* Titre */}
              <h2 className="text-xl font-bold text-dark dark:text-white mt-4">
                {event.title}
              </h2>

              {/* Date & Lieu */}
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                📍 {event.location} | 📅{" "}
                {new Date(event.date).toLocaleDateString("fr-FR")}
              </p>

              {/* Description */}
              <p className="text-gray-500 dark:text-gray-300 mt-3 text-sm">
                {event.description}
              </p>

              {/* Participants */}
              <p className="text-gray-700 dark:text-gray-400 mt-2 text-sm font-semibold">
                👥 {event.maxParticipants} Participants max
              </p>

              {/* Bouton S'inscrire */}
              <a
                href={`/events/${event.id}`}
                className=" block text-center mt-4 w-full bg-primary text-white font-semibold py-2 px-4 rounded-md shadow-md 
                transition-all duration-300 hover:bg-blue-600 active:scale-95 cursor-pointer"
              >
                S'inscrire
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-3">
            Aucun événement disponible.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventCard;
