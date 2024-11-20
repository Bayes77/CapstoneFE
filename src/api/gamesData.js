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

export { deleteGame, getGames };
