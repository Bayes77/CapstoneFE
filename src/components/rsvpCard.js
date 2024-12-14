'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/card';
import { Card } from 'react-bootstrap';
import { deleteRsvp } from '../api/rsvpData';

export default function RsvpCard({ rsvpObj, onUpdate }) {
  const deleteThisRsvp = () => {
    if (window.confirm(`Delete ${rsvpObj.dietaryRestrict}?`)) {
      deleteRsvp(rsvpObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card id="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>
          {}
          <br />
        </Card.Title>
        <p className="card-text bold">
          {/* {eventsObj.sale && (
          <span>
            SALE
            <br />
          </span>
        )}{' '} */}
          {rsvpObj.adults}
          {rsvpObj.children}
          {rsvpObj.dietaryRestrict}
          <br />
        </p>

        {/* <Link href={}} passHref>
          <Button variant="info">Details</Button>
        </Link> */}

        <Button id="delete" variant="danger" onclick={deleteThisRsvp} className="m-2">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

RsvpCard.propTypes = {
  rsvpObj: PropTypes.shape({
    adults: PropTypes.number,
    children: PropTypes.number,
    id: PropTypes.number,
    dietaryRestrict: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
