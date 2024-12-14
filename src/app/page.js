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
  const [searchItem, setSearchItem] = useState('');

  // const { user } = useAuth();

  // *function that makes api call to getAllTheEvents
  const getAllTheEvents = () => {
    getEvents().then(setEvents);
  };

  function handleChange(e) {
    setSearchItem(e.target.value);
  }

  const searchResults = events.filter((event) => JSON.stringify(event).toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()));

  // *API call to get getAllEvents on component to render
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
          <Button>Add an Event</Button>
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
export default HomePage;
