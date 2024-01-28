/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../api/mergedData';

export default function ViewTeam() {
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then((response) => {
      if (response && Array.isArray(response.players)) {
        setTeamPlayers(response.players);
        setTeamDetails(response);
      } else {
        console.error('unexpected respoonse structure:', response);
      }
    });
  }, [firebaseKey]);

  const justifyContentStyle = teamPlayers.length === 1 ? 'center' : 'space-around';
  return (
    <>
      <div className="mt-5 d-flex flex-wrap" style={{ justifyContent: 'center', alignContent: 'center' }}>
        <div
          key={teamDetails.name}
          className="card m-2"
          style={{
            width: '400px',
            margin: '0 auto',
            boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
            background: 'grey',
          }}
        >
          <img src={teamDetails.image} alt={teamDetails.name} className="card-img-top" style={{ width: '100%', maxHeight: '350px', boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)' }} />
          <h1 style={{ textAlign: 'center' }}> {teamDetails.name} </h1>
        </div>
      </div>
      <div className="mt-5 d-flex flex-wrap" style={{ justifyContent: justifyContentStyle, alignContent: 'center' }}>
        {teamPlayers.map((player) => (
          <div
            key={player.id}
            className="card m-2"
            style={{
              width: '400px',
              margin: '0 auto',
              boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
              background: 'grey',
            }}
          >
            <img src={player.image} alt={player.name} className="card-img-top" style={{ width: '100%', maxHeight: '350px', boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)' }} />
            <div className="card-body text-grey">
              <h1>{player.name}</h1>
              <h5 className="card-title">
                Position: {player.role}
                {player.status ? ' 🤍' : ''}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
