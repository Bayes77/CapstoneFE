'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { getDietary } from '../api/dietaryData';
import { createRsvp, updateRsvp } from '../api/rsvpData';

const initialState = {
  id: null,
  Adult: '',
  Children: '',
  dietary: [],
};

function RsvpForm({ obj = initialState }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);
  const [dietarys, setDietarys] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState('');
  const router = useRouter();

  useEffect(() => {
    getDietary(user.id).then(setDietarys);
    if (obj.firebaseKey) {
      setFormInput();
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dietary') {
      setSelectedDietary(value);
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addDietary = () => {
    if (selectedDietary && !formInput.dietray.includes(selectedDietary)) {
      setFormInput((prevState) => ({
        ...prevState,
        dietary: [...prevState.dietary, selectedDietary],
      }));
      setSelectedDietary(''); // Clear the dropdown after adding
    }
  };

  const removeDietary = (dietaryToRemove) => {
    setFormInput((prevState) => ({
      ...prevState,
      dietary: prevState.dietary.filter((dietary) => dietary !== dietaryToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateRsvp(formInput).then(() => router.push(`/event/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createRsvp(payload).then((r) => {
        const { name } = r;
        updateRsvp({ ...payload, firebaseKey: name });
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

      {/* Dietary Selection */}
      <FloatingLabel controlId="floatingSelect" label="dietary Name">
        <Form.Select
          id="currentdietary"
          aria-label="dietary"
          name="dietary"
          onChange={handleChange}
          className="mb-3"
          value={selectedDietary} // Bind to selecteddietary state
        >
          <option value="">Select a Dietary Restriction</option>
          {dietarys?.map((dietary) => (
            <option key={dietary.id} value={dietary.name}>
              {dietary.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button variant="primary" onClick={addDietary} className="mb-3">
        Add Dietary Restiction
      </Button>

      {/* Selected dietary List */}
      <ul>
        {formInput.dietary.map((dietary) => (
          <li key={dietary}>
            {dietary}{' '}
            <Button variant="danger" size="sm" onClick={() => removeDietary(dietary)}>
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

RsvpForm.propTypes = {
  obj: PropTypes.shape({
    Adult: PropTypes.number,
    children: PropTypes.number,
    dietaryId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default RsvpForm;
