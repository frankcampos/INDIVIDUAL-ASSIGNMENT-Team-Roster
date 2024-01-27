import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/membersData';
import { getTeams } from '../../api/teamsData';

// TODO: initialState
const initialState = {
  image: '',
  name: '',
  role: '',
  status: true,
};

// TODO: Create function NewForm
function NewForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  // useEffetc get Players

  // TODO: handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>
      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Player Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>
      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      {/* ROLE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Role" className="mb-3">
        <Form.Control type="text" placeholder="Role" name="role" value={formInput.role} onChange={handleChange} required />
      </FloatingLabel>

      {/* TEAM SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select aria-label="Team" name="team_id" onChange={handleChange} className="mb-3" value={formInput.team_id} required>
          <option value="">Select a Team</option>
          {teams.map((team) => (
            <option key={team.firebaseKey} value={team.firebaseKey}>
              {team.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="status"
        name="status"
        label={formInput.status ? 'Active' : 'Retired'}
        checked={formInput.status}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            status: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player </Button>
    </Form>
  );
}
NewForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
    status: PropTypes.bool,
  }),
};

NewForm.defaultProps = {
  obj: initialState,
};

export default NewForm;
