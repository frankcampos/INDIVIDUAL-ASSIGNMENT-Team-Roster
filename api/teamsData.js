import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Teams.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Teams/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Teams/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: DELETE AUTHOR
const deleteSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Teams/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getTeams = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Teams.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getTeamPlayers = (teamid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members.json?orderBy="team_id"&equalTo="${teamid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  createTeam, updateTeam, getSingleTeam, deleteSingleTeam, getTeams, getTeamPlayers,
};
