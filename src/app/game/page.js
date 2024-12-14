'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import GamesCard from '../../components/gamesCard';
import { useAuth } from '../../utils/context/authContext';
import { getGames } from '../../api/gamesData';

function GamesPage() {
  const [games, setGames] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const { user } = useAuth();

  const getAllTheGames = () => {
    getGames(user.uid).then(setGames);
  };

  function handleChange(e) {
    setSearchItem(e.target.value);
  }

  const searchResults = games.filter((game) => JSON.stringify(game).toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()));

  useEffect(() => {
    getAllTheGames();
  }, []);

  return (
    <>
      <div className="search-bar-container">
        <input style={{ width: '600px', display: 'block', margin: '0 auto', borderRadius: '7px', marginTop: '15px' }} type="search" placeholder="Search for games" onChange={handleChange} className="search-input" />
      </div>
      <div className="text-center my-4">
        <Link href="/game/" passHref>
          <Button>Add Games</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {searchResults.map((game) => (
            <GamesCard key={game.firebaseKey} gamesObj={game} onUpdate={getAllTheGames} />
          ))}
        </div>
      </div>
    </>
  );
}

export default GamesPage;
