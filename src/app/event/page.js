'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getAllUserEvents } from '../../api/eventsData';
import EventsCard from '../../components/EventsCard';

function Eventspage() {
  const [events, setEvents] = useState([]);

  const { user } = useAuth();

  const getAllTheEvents = () => {
    getAllUserEvents(user.uid).then(setEvents);
  };

  useEffect(() => {
    getAllTheEvents();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/event/new" passHref>
        <Button>Add Events</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {}
        {events.map((event) => (
          <EventsCard key={event.firebaseKey} eventsObj={event} onUpdate={getAllTheEvents} />
        ))}
      </div>
    </div>
  );
}

export default Eventspage;
