'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getGames } from '../api/gamesData';
import { createEvents, updateEvents } from '../api/eventsData';

const initialState = {
  id: null,
  eventName: '',
  date: '',
  time: '',
  games: [], // games will be an array
};

function CreateEventsForm({ obj = initialState }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(''); // Track selected game
  const router = useRouter();

  useEffect(() => {
    getGames(user.uid).then(setGames);
    if (obj.firebaseKey) {
      setFormInput({
        ...obj,
        date: obj.date ? obj.date.slice(0, 10) : '',
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'games') {
      setSelectedGame(value); // Set selected game instead of directly appending
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addGame = () => {
    if (selectedGame && !formInput.games.includes(selectedGame)) {
      setFormInput((prevState) => ({
        ...prevState,
        games: [...prevState.games, selectedGame],
      }));
      setSelectedGame(''); // Clear the dropdown after adding
    }
  };

  const removeGame = (gameToRemove) => {
    setFormInput((prevState) => ({
      ...prevState,
      games: prevState.games.filter((game) => game !== gameToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateEvents(formInput).then(() => router.push(`/event/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createEvents(payload).then((r) => {
        const { name } = r;
        updateEvents({ ...payload, firebaseKey: name });
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Event</h2>

      {/* Event Name */}
      <FloatingLabel controlId="floatingInput1" label="Event Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter name" name="eventName" value={formInput.eventName} onChange={handleChange} required />
      </FloatingLabel>

      {/* Date */}
      <FloatingLabel controlId="floatingInput2" label="Date" className="mb-3">
        <Form.Control type="text" placeholder="Enter Date" name="date" value={formInput.date} onChange={handleChange} required />
      </FloatingLabel>

      {/* Game Selection */}
      <FloatingLabel controlId="floatingSelect" label="Game Name">
        <Form.Select
          id="currentGame"
          aria-label="game"
          name="games"
          onChange={handleChange}
          className="mb-3"
          value={selectedGame} // Bind to selectedGame state
        >
          <option value="">Select a Game</option>
          {games?.map((game) => (
            <option key={game.id} value={game.name}>
              {game.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button variant="primary" onClick={addGame} className="mb-3">
        Add Game
      </Button>

      {/* Selected Games List */}
      <ul>
        {formInput.games.map((game) => (
          <li key={game}>
            {game}{' '}
            <Button variant="danger" size="sm" onClick={() => removeGame(game)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>

      {/* Event Image */}
      <FloatingLabel controlId="floatingInput3" label="Event Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter a event image url" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} />
      </FloatingLabel>

      {/* Time */}
      <FloatingLabel controlId="floatingInput4" label="Time" className="mb-3">
        <Form.Control type="text" placeholder="Enter a time" name="time" value={formInput.time} onChange={handleChange} required />
      </FloatingLabel>

      {/* Submit Button */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Event</Button>
    </Form>
  );
}

CreateEventsForm.propTypes = {
  obj: PropTypes.shape({
    eventName: PropTypes.string,
    image: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    gameId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default CreateEventsForm;
