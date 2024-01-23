import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/membersData';

// TODO: initialState
const initialState = {
  image: '',
  name: '',
  role: '',

};

// TODO: Create function NewForm
function NewForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  },
  [obj]);

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
      updateMember(formInput).then(() => router.push(`/${obj.firebaseKey}`));
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
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'}Player</h2>
      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Player Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Name" name="name" value={formInput.first_name} onChange={handleChange} required />
      </FloatingLabel>
      {/* LAST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Role" className="mb-3">
        <Form.Control type="text" placeholder="Role" name="role" value={formInput.last_name} onChange={handleChange} required />
      </FloatingLabel>
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}
NewForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

NewForm.defaultProps = {
  obj: initialState,
};

export default NewForm;
