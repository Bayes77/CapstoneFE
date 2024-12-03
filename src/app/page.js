'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// import { useAuth } from '@/utils/context/authContext';
import { getEvents } from '../api/eventsData';
import EventsCard from '../components/EventsCard';

function HomePage() {
  // *set state for events
  const [events, setEvents] = useState([]);

  // const { user } = useAuth();

  // *function that makes api call to getAllTheEvents
  const getAllTheEvents = () => {
    getEvents().then(setEvents);
  };

  // *API call to get getAllEvents on component to render
  useEffect(() => {
    getAllTheEvents();
  }, []);
  console.log(events);
  return (
    <div className="text-center my-4">
      <Link href="/event/new" passHref>
        <Button>Add an Event</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {events.map((event) => (
          <EventsCard key={event.firebaseKey} eventsObj={event} onUpdate={getAllTheEvents} />
        ))}
      </div>
    </div>
  );
}
export default HomePage;
