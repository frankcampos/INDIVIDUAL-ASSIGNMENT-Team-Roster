/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../api/membersData';
import PlayerCard from '../components/PlayerCard';

function ViewSinglePlayer() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [player, setPlayer] = useState(null); // Initialize to null

  const getPlayer = () => {
    if (firebaseKey) {
      getSingleMember(firebaseKey).then(setPlayer).catch(console.error);
    }
  };

  useEffect(() => {
    getPlayer();
  }, [firebaseKey]); // Depend on firebaseKey

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap" style={{ justifyContent: 'space-evenly' }}>
        {player ? (
          <PlayerCard key={player.firebaseKey} memberObject={player} />
        ) : (
          <p>Noone is here...</p> // Display loading message
        )}
      </div>
    </div>
  );
}

export default ViewSinglePlayer;
