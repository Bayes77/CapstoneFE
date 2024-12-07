'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import GamesCard from '../../components/gamesCard';
import { useAuth } from '../../utils/context/authContext';
import { getGames } from '../../api/gamesData';

function GamesPage() {
  const [games, setGames] = useState([]);
  const { user } = useAuth();

  const getAllTheGames = () => {
    getGames(user.uid).then(setGames);
  };

  useEffect(() => {
    getAllTheGames();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/game/" passHref>
        <Button>Add Games</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {}
        {games.map((game) => (
          <GamesCard key={game.firebaseKey} gamesObj={game} onUpdate={getAllTheGames} />
        ))}
      </div>
    </div>
  );
}

export default GamesPage;
