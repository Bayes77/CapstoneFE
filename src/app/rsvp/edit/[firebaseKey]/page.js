'use client';

import React, { useEffect, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { getGames } from '../../../../api/gamesData';
import RsvpForm from '../../../../components/rsvpForm';

export default function EditRsvp({ params }) {
  const [editRsvps, setEditRsvps] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getGames(firebaseKey).then(setEditRsvps);
  }, [firebaseKey]);

  return <RsvpForm obj={editRsvps} />;
}

EditRsvp.propTypes = {
  params: propTypes.objectOf({}),
};
