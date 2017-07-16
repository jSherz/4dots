import PropTypes from 'prop-types';

export class LeaderboardEntry {

  static propTypes = {
    name: PropTypes.string.isRequired,
    numWins: PropTypes.number.isRequired
  };

  name;
  numWins;

  constructor(name, numWins) {
    this.name = name;
    this.numWins = numWins;
  }

}

export default LeaderboardEntry;
