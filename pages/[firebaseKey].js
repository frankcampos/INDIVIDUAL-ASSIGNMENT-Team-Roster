/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../api/membersData';
import PlayerCard from '../components/PlayerCard';

function ViewSinglePlayer() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  // TODO: Set a state for books
  const [player, setPlayer] = useState({});

  // TODO: Get user ID using useAuth Hoo

  // TODO: create a function that makes the API call to get all the members
  const getPlayer = () => {
    getSingleMember(firebaseKey).then(setPlayer);
  };

  // TODO: make the call to the API to get all the members on component render
  useEffect(() => {
    getPlayer();
  }, []);

  // TODO: make the call to the API to get all the filtered members on component render

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap" style={{ justifyContent: 'space-evenly' }}>
        {/* TODO: map over members here using PlayerCard component */}

        <PlayerCard key={player.firebaseKey} memberObject={player} />
      </div>

    </div>
  );
}

export default ViewSinglePlayer;
