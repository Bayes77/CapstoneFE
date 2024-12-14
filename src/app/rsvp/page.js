'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getAllUserRsvp } from '../../api/rsvpData';
import RsvpCard from '../../components/rsvpCard';

function Rsvppage() {
  const [rsvps, setRsvps] = useState([]);

  const { user } = useAuth();

  const getAllTheRsvp = () => {
    getAllUserRsvp(user.uid).then(setRsvps);
  };

  useEffect(() => {
    getAllTheRsvp();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/rsvp/new" passHref>
        <Button>Add Events</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {}
        {rsvps.map((rsvp) => (
          <RsvpCard key={rsvp.firebaseKey} rsvpsObj={rsvp} onUpdate={getAllTheRsvp} />
        ))}
      </div>
    </div>
  );
}

export default Rsvppage;
