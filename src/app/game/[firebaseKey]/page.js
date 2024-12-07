'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { deleteGame, getGames } from '../../../api/gamesData';

export default function ViewGamesDetails({ params }) {
  const [gamesDetails, setGameDetails] = useState();
  const { firebaseKey } = params;
  const router = useRouter;

  useEffect(() => {
    if (firebaseKey) {
      getGames(firebaseKey).then(setGameDetails);
    }
  }, [firebaseKey]);

  const deleteThisGame = () => {
    if (window.confirm(`Are you sure you want to delete this game?`)) {
      deleteGame(router.query.firebaseKey).then(() => {
        router.push(`/game`);
      });
    }
  };

  if (!gamesDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>{gamesDetails.name}</h5>
        <p className="card-text bold">
          {gamesDetails.designer} {gamesDetails.numberOfPlayers}
        </p>

        {/* Display associated games */}
        {gamesDetails.games.map((game) => (
          <p>{game}</p>
        ))}
        <br />
        {/* Delete button, optional condition for ownership */}
        <Button variant="danger" onClick={deleteThisGame} className="m-2">
          DELETE
        </Button>
        <hr />
      </div>
    </div>
  );
}

ViewGamesDetails.propTypes = {
  params: propTypes.objectOf({}).isRequired,
};
