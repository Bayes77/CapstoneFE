'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteEvents } from '../api/eventsData';
import { useAuth } from '../utils/context/authContext';

function EventsCard({ eventsObj, onUpdate }) {
  const { user } = useAuth();

  // * this function is for deleting events
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${eventsObj.eventName}?`)) {
      deleteEvents(eventsObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card id="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={eventsObj.imageUrl} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>
          {eventsObj.eventName}
          <br />
        </Card.Title>
        <p className="card-text bold">
          {/* {eventsObj.sale && (
            <span>
              SALE
              <br />
            </span>
          )}{' '} */}
          {eventsObj.date}
          {eventsObj.time}
          <br />
        </p>

        <br />
        {/* *DYNAMIC LINK TO events DETAILS  */}
        <Link href={`/event/${eventsObj.firebaseKey}`} passHref>
          <Button id="details" variant="primary">
            Details
          </Button>
          <br />
        </Link>
        {user.uid === eventsObj.uid && (
          <Link href={`/event/edit/${eventsObj.firebaseKey}`} passHref>
            <Button id="edit" variant="info">
              Edit
            </Button>
            <br />
          </Link>
        )}
        {user.uid === eventsObj.uid && (
          <Button id="delete" onClick={deleteThisEvent} className="m-2">
            DELETE
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

EventsCard.propTypes = {
  eventsObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    eventName: PropTypes.string,
    id: PropTypes.number,
    date: PropTypes.string,
    time: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventsCard;
