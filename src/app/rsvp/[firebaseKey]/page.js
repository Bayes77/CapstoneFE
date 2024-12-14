'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { deleteRsvp, getRsvp } from '../../../api/rsvpData';

export default function ViewRsvpDetails({ params }) {
  const [rsvpsDetails, setRsvpsDetails] = useState();
  const { firebaseKey } = params;
  const router = useRouter;

  useEffect(() => {
    if (firebaseKey) {
      getRsvp(firebaseKey).then(setRsvpsDetails);
    }
  }, [firebaseKey]);

  const deleteThisRsvp = () => {
    if (window.confirm(`Are you sure you want to delete this Rsvp?`)) {
      deleteRsvp(router.query.firebaseKey).then(() => {
        router.push(`/rsvp`);
      });
    }
  };

  if (!rsvpsDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>{rsvpsDetails.name}</h5>
        <p className="card-text bold">{rsvpsDetails.designer}</p>

        {/* Display associated games */}
        {rsvpsDetails.rsvps.map((rsvp) => (
          <p>{rsvp}</p>
        ))}
        <br />
        {/* Delete button, optional condition for ownership */}
        <Button variant="danger" onClick={deleteThisRsvp} className="m-2">
          DELETE
        </Button>
        <hr />
      </div>
    </div>
  );
}

ViewRsvpDetails.propTypes = {
  params: propTypes.objectOf({}).isRequired,
};
