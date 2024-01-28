/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamsData';
import Teamcard from '../components/TeamCard';

function Home() {
  // TODO: Set a state for Teams
  const [members, setMembers] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the members
  const getAllTheTeams = () => {
    getTeams(user.uid).then(setMembers);
  };

  // TODO: make the call to the API to get all the members on component render
  useEffect(() => {
    getAllTheTeams();
  }, []);

  // TODO: make the call to the API to get all the filtered members on component render

  return (
    <div className="text-center my-4">
      <Link href="/newteam" passHref>
        <Button style={{ margin: '0 0 10px' }}>Add A TEAM</Button>
      </Link>
      <div className="d-flex flex-wrap" style={{ justifyContent: 'space-evenly' }}>
        {/* TODO: map over members here using PlayerCard component */}
        {members.map((team) => (
          <Teamcard key={team.firebaseKey} memberObject={team} onUpdate={getAllTheTeams} />
        ))}
      </div>

    </div>
  );
}

export default Home;
