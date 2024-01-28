import { getSingleTeam, getTeamPlayers, deleteSingleTeam } from './teamsData';
import { deleteSingleMember } from './membersData';

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamPlayers(teamFirebaseKey)])
    .then(([teamObject, teamPlayersArray]) => {
      resolve({ ...teamObject, players: teamPlayersArray });
    })
    .catch((error) => reject(error));
});

const deleteTeamPlayers = (TeamId) => new Promise((resolve, reject) => {
  getTeamPlayers(TeamId)
    .then((playersArray) => {
      const deleteSingleMemberPromises = playersArray.map((book) => deleteSingleMember(book.firebaseKey));

      Promise.all(deleteSingleMemberPromises).then(() => {
        deleteSingleTeam(TeamId).then(resolve);
      });
    })
    .catch((error) => reject(error));
});

export { viewTeamDetails, deleteTeamPlayers };
