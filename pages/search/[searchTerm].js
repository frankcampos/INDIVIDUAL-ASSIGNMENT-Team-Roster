/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getMembers } from '../../api/membersData';
import PlayerCard from '../../components/PlayerCard';

const SearchPage = () => {
  const router = useRouter();
  const { searchTerm } = router.query; // Make sure the query param name is correct
  const [members, setMembers] = useState([]); // State for all members
  const [filteredMembers, setFilteredMembers] = useState([]); // State for filtered members
  const { user } = useAuth();

  useEffect(() => {
    // Assuming getMembers and user.uid are defined and imported
    getMembers(user.uid)
      .then((membersArray) => {
        setMembers(membersArray);
        setFilteredMembers(membersArray); // Initialize with all members
      });
  }, []);

  useEffect(() => {
    if (searchTerm && searchTerm !== '') {
      const filtered = members.filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members); // Show all members if no search term
    }
  }, [searchTerm, members]);

  return (
    <div>
      {/* Render your filtered results */}
      {filteredMembers.map((member) => (
        <PlayerCard key={member.firebaseKey} memberObject={member} onUpdate={filteredMembers} />
      ))}
    </div>
  );
};

export default SearchPage;
