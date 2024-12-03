'use client';

import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { getSingleEvent } from '../../../../api/eventsData';
import CreateEventsForm from '../../../../components/CreateEventsForm';

export default function EditEvent({ params }) {
  const [editItems, setEditItems] = useState({});

  const { firebaseKey } = params;

  useEffect(() => {
    getSingleEvent(firebaseKey).then(setEditItems);
  }, [firebaseKey]);

  return <CreateEventsForm obj={editItems} />;
}

EditEvent.propTypes = {
  params: propTypes.objectOf({}).isRequired,
};
