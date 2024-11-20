import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

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

export default { deleteGame };
