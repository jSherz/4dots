import PropTypes from 'prop-types';

import LeaderboardEntry from './LeaderboardEntry';

export class Leaderboard {

  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.shape(LeaderboardEntry.propTypes).isRequired).isRequired
  };

  players;

  constructor(players) {
    this.players = players;
  }

}

export default Leaderboard;
