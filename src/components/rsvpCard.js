'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap/card';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function rsvpCard({ rsvpObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{rsvpObj.event.eventName}</Card.Title>
        <p className="card-text bold">{rsvpObj.event.date}</p>
        <p className="card-text bold">{rsvpObj.event.time}</p>
        <Link href={`/events/details/${rsvpObj.eventId}`} passHref>
          <Button variant="info">Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

rsvpCard.propTypes = {
  rsvpObj: PropTypes.shape({
    eventId: PropTypes.number,
    event: PropTypes.shape({
      eventName: PropTypes.string,
      date: PropTypes.string,
      time: PropTypes.string,
    }),
  }).isRequired,
};
