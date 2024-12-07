'use client';

import React, { useEffect, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { getGames } from '../../../../api/gamesData';
import CreateGamesForm from '../../../../components/CreateGamesForm';

export default function EditGames({ params }) {
  const [editGames, setEditGames] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getGames(firebaseKey).then(setEditGames);
  }, [firebaseKey]);

  return <CreateGamesForm obj={editGames} />;
}

EditGames.propTypes = {
  params: propTypes.objectOf({}),
};
