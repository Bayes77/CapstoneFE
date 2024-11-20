import { object } from 'prop-types';
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getEvents = () =>
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

export default { getEvents };
