'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createGames, updateGames } from '../api/gamesData';

const initialState = {
  name: '',
  image: '',
  designer: '',
  numberOfPLayers: '',
  firebaseKey: '',
};

function CreateGamesForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
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
      updateGames(formInput).then(() => router.push(`/games/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createGames(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateGames(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      {/* *First Name INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Game Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Game Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* * Last Name INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="game image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* *Email INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="designer" className="mb-3">
        <Form.Control type="text" placeholder="Enter Designer" name="designer" value={formInput.designer} onChange={handleChange} required />
      </FloatingLabel>

      {/* AUTHOR SELECT  */}
      {/* <FloatingLabel controlId="floatingSelect" label="Author">
          <Form.Select aria-label="Author" name="author_id" onChange={handleChange} className="mb-3" value={formInput.author_id || ''} required>
            <option value="">Select an Author</option>
            {author.map((author) => (
              <option key={author.firebaseKey} value={author.firebaseKey}>
                {author.first_name} {author.last_name}
              </option>
            ))} */}
      {/* </Form.Select>
        </FloatingLabel>
   */}
      {/* DESCRIPTION TEXTAREA 
        <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
          <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={formInput.description} onChange={handleChange} required />
        </FloatingLabel> */}

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      {/* <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite Author?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }} */}
      {/* /> */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Games</Button>
    </Form>
  );
}

CreateGamesForm.propTypes = {
  obj: PropTypes.shape({
    gameName: PropTypes.string,
    image: PropTypes.string,
    designer: PropTypes.string,
    numberOfPLayers: PropTypes.number,
    firebaseKey: PropTypes.string,
  }),
};

export default CreateGamesForm;
