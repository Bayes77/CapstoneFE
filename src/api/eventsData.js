import { object } from 'prop-types';
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllEvents = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}Events.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(object.values(data)))
      .catch(reject);
  });

const deleteEvents = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/events/${firebaseKey}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/jason',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllEvents, deleteEvents };
