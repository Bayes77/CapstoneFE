import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getDietary = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/dietary.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application.json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const createDietary = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/dietary.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateDietary = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/dietary/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteDietary = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/dietary/${firebaseKey}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getDietary, createDietary, updateDietary, deleteDietary };
