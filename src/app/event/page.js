'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getAllUserEvents } from '../../api/eventsData';
import EventsCard from '../../components/EventsCard';

function Eventspage() {
  const [events, setEvents] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const { user } = useAuth();

  const getAllTheEvents = () => {
    getAllUserEvents(user.uid).then(setEvents);
  };

  function handleChange(e) {
    setSearchItem(e.target.value);
  }

  const searchResults = events.filter((event) => JSON.stringify(event).toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()));

  useEffect(() => {
    getAllTheEvents();
  }, []);

  return (
    <>
      <div className="search-bar-container">
        <input style={{ width: '600px', display: 'block', margin: '0 auto', borderRadius: '7px', marginTop: '15px' }} type="search" placeholder="Search for events" onChange={handleChange} className="search-input" />
      </div>
      <div className="text-center my-4">
        <Link href="/event/new" passHref>
          <Button>Add Events</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {searchResults.map((event) => (
            <EventsCard key={event.firebaseKey} eventsObj={event} onUpdate={getAllTheEvents} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Eventspage;
