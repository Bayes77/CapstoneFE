'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteEvents, getSingleEvent } from '../../../api/eventsData';
import { useAuth } from '../../../utils/context/authContext';

function ViewEventDetails({ params }) {
  const [eventDetails, setEventDetails] = useState({});
  const { firebaseKey } = params;
  const { user } = useAuth();

  useEffect(() => {
    getSingleEvent(firebaseKey).then((data) => {
      setEventDetails(data);
    });
  }, [firebaseKey, user]);

  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${eventDetails.eventName}?`)) {
      deleteEvents(firebaseKey).then();
    }
  };

  const isOwner = !firebaseKey || user.uid === user.id;

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>{eventDetails.eventName}</h5>
        <p className="card-text bold">
          {eventDetails.date}
          {eventDetails.time}
          <br />
        </p>
        {isOwner && (
          <Button variant="danger" onClick={deleteThisEvent} className="m-2">
            DELETE
          </Button>
        )}
        <hr />
      </div>
    </div>
  );
}

ViewEventDetails.propTypes = {
  params: PropTypes.shape([]),
  eventDetails: PropTypes.shape({
    eventName: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
};
