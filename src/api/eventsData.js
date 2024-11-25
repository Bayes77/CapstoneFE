import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getEvents = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/events.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

const createEvents = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/events.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify(payload),
    })
      .then((respose) => respose.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateEvents = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/events/${payload.firebaseKey}.json`, {
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

const getSingleEvent = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/events/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        ContentType: 'application.json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
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

export { getEvents, deleteEvents, createEvents, updateEvents, getSingleEvent };
