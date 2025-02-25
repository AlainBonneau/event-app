interface Event {
  id: number;
  title: string;
  description: string;
}

interface EventCardProps {
  events: Event[];
}

// Changer le contenu du fichier EventCard.tsx en respectant les wireframes

const EventCard = ({ events }: EventCardProps) => {
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

export default EventCard;
