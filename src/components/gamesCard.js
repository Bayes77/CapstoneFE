'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap/card';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
// eslint-disable-next-line import/named
import { deleteGame } from '../api/gamesData';
import { useAuth } from '../utils/context/authContext';
// import { useAuth } from '../utils/context/authContext';

export default function gamesCard({ gamesObj, onUpdate }) {
  const { user } = useAuth;

  // * function for deleting games
  const deleteThisGame = () => {
    if (window.confirm(`Delete ${gamesObj.gameName}?`)) {
      deleteGame(gamesObj.firebaseKey).then(() => onUpdate());
    }
  };

  // *for getting user owned games
  const isOwner = !gamesObj.firebaseKey || gamesObj.uid === user.id;

  return (
    <Card id="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={gamesObj.image} alt={gamesObj.gameName} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{gamesObj.gameName}</Card.Title>
        <p className="card-text bold">
          {/* {venuesObj.sale && (
              <span>
                SALE
                <br />
              </span>
            )}{' '} */}
          {gamesObj.designer}
          <br />
          {gamesObj.numberOfPlayers}
        </p>

        {/* DYNAMIC LINK TO VIEW THE Venue DETAILS
          <Link href={`/venues/${venuesObj.id}`} passHref>
            <Button variant="primary" className="m-2">
              VIEW
            <Button>
          </Link> */}
        {/* DYNAMIC LINK TO EDIT THE venues DETAILS  */}
        {isOwner && (
          <Link href={`/games/edit/${gamesObj.firebaseKey}`} passHref>
            <Button id="edit" variant="info">
              Edit
            </Button>
          </Link>
        )}
        {isOwner && (
          <Button id="delete" variant="danger" onClick={deleteThisGame} className="m-2">
            DELETE
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

gamesCard.propTypes = {
  gamesObj: PropTypes.shape({
    gameName: PropTypes.string,
    imageUrl: PropTypes.string,
    designer: PropTypes.string,
    numberOfPlayers: PropTypes.number,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
