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

  const isOwner = !eventsObj.firebaseKey || eventsObj.uid === user.id;

  return (
    <Card id="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={eventsObj.imageUrl} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>
          {eventsObj.eventName}
          {/* <br /> {eventsObj.venue?.name} */}
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
          {/* <br />${eventsObj.ticketPrice} */}
          <br />
        </p>
        {/* {eventsObj.city} */}
        {/* <Link href={eventsObj.ticketUrl}>
        <Button variant="primary" size="sm" id="ticket">
          Tickets
        </Button>
      </Link> */}
        <br />
        {/* *DYNAMIC LINK TO events DETAILS  */}
        <Link href={`/events/details/${eventsObj.firebaseKey}`} passHref>
          <Button id="details" variant="primary">
            Details
          </Button>
          <br />
        </Link>
        {isOwner && (
          <Link href={`/events/edit/${eventsObj.firebaseKey}`} passHref>
            <Button id="edit" variant="info">
              Edit
            </Button>
            <br />
          </Link>
        )}
        {isOwner && (
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
    date: PropTypes.string,
    time: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventsCard;
