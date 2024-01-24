/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getMembers } from '../api/membersData';
import { useAuth } from '../utils/context/authContext';
import PlayerCard from '../components/PlayerCard';

function Home() {
  // TODO: Set a state for books
  const [members, setMembers] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the members
  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  // TODO: make the call to the API to get all the members on component render
  useEffect(() => {
    getAllTheMembers();
  }, []);

  // TODO: make the call to the API to get all the filtered members on component render

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap" style={{ justifyContent: 'space-evenly' }}>
        {/* TODO: map over members here using PlayerCard component */}
        {members.map((member) => (
          <PlayerCard key={member.firebaseKey} memberObject={member} onUpdate={getAllTheMembers} />
        ))}
      </div>

    </div>
  );
}

export default Home;
