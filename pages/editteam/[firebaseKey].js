import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../api/teamsData';
import NewFormTeam from '../../components/forms/newFormTeam';

function EditTeam() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <div>
      <NewFormTeam obj={editItem} />
    </div>
  );
}

export default EditTeam;
