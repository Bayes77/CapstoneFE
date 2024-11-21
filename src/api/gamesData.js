import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getGames = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/games.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application.json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createGames = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Events.json`, {
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

const updateGames = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Games/${payload.firebaseKey}.json`, {
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

const deleteGame = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/games/${firebaseKey}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { deleteGame, getGames, createGames, updateGames };
