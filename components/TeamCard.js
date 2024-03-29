import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleTeam } from '../api/teamsData';

function Teamcard({ memberObject, onUpdate }) {
  console.warn(memberObject);
  // FOR DELETE, WE NEED TO REMOVE THE Author AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisMember = () => {
    if (window.confirm(`Dou you want to Delete ${memberObject.name}?`)) {
      deleteSingleTeam(memberObject.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card
      style={{
        width: '18rem',
        margin: '10px',
        background: 'grey',
        boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
      }}
    >
      <Card.Img
        variant="top"
        src={memberObject.image}
        alt={memberObject.name}
        style={{
          height: '100%', width: '100%', boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)', objectFit: 'contain',
        }}
      />
      <Card.Body>
        <Card.Title>{memberObject.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/${memberObject.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2" style={{ boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)' }}>
            VIEW
          </Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/editteam/${memberObject.firebaseKey}`} passHref>
          <Button variant="info" style={{ boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)' }}>
            EDIT
          </Button>
        </Link>
        <Button variant="danger" style={{ boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)' }} onClick={deleteThisMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

Teamcard.propTypes = {
  memberObject: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Teamcard;
