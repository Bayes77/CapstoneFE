'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getGames } from '../api/gamesData';
import { createEvents, updateEvents } from '../api/eventsData';

// * clears out form after user submits form
const initialState = {
  eventsName: '',
  date: '',
  time: '',
  games: '',
};

// * function pulls in suer and object details
function CreateEventsForm({ obj = initialState }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);
  const [games, setGames] = useState([]);
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
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateEvents(formInput).then(() => router.push(`/events/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createEvents(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateEvents(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Event</h2>

      <FloatingLabel controlId="floatingInput1" label="Event Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter name" name="eventName" value={formInput.eventName} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="date" className="mb-3">
        <Form.Control type="text" placeholder="Enter Date" name="date" value={formInput.date} onChange={handleChange} required />
      </FloatingLabel>

      {/* *Dropdown to select a game */}
      <FloatingLabel controlId="floatingSelect" label="Game Name">
        <Form.Select aria-label="Game" name="gameId" onChange={handleChange} className="mb-3" value={formInput.gameId || ''}>
          <option value="">Select a Game</option>
          {games?.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
              {/* {game.designer} */}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Event Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter a event image url" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Time" className="mb-3">
        <Form.Control type="text" placeholder="Enter a time" name="time" value={formInput.time} onChange={handleChange} required />
      </FloatingLabel>

      {/* <FloatingLabel controlId="floatingInput5" label="Ticket Price" className="mb-3">
          <Form.Control type="number" placeholder="Ticket price" name="ticketPrice" value={formInput.ticketPrice} onChange={handleChange} required />
        </FloatingLabel> */}

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
