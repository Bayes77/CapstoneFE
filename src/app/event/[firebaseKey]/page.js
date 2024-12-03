'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { getSingleEvent, deleteEvents } from '../../../api/eventsData';
import { getGamesByEvent } from '../../../api/gamesData';

export default function ViewEventDetails({ params }) {
  const [eventDetails, setEventDetails] = useState(null);
  const [, setGameDetails] = useState([]);
  const { firebaseKey } = params;
  const router = useRouter();

  // Only fetch data when router.query and firebaseKey are available
  useEffect(() => {
    if (firebaseKey) {
      // if (isMounted && firebaseKey) {
      getSingleEvent(firebaseKey).then(setEventDetails);
      getGamesByEvent(firebaseKey).then(setGameDetails);
    }
  }, [firebaseKey]);

  const deleteThisEvent = () => {
    if (window.confirm(`Are you sure you want to delete this event?`)) {
      deleteEvents(router.query.firebaseKey).then(() => {
        router.push('/events'); // Navigate away after deletion
      });
    }
  };

  // Ensure that eventDetails is loaded before rendering
  if (!eventDetails) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>{eventDetails.eventName}</h5>
        <p className="card-text bold">
          {eventDetails.date} {eventDetails.time}
        </p>
        {/* Display associated games */}
        {eventDetails.games?.map((game) => (
          <p>{game}</p>
        ))}
        <br />
        {/* Delete button, optional condition for ownership */}
        <Button variant="danger" onClick={deleteThisEvent} className="m-2">
          DELETE
        </Button>
        <hr />
      </div>
    </div>
  );
}

ViewEventDetails.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
