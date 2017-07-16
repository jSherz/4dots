import { connect } from 'react-redux';

import App from './App';
import { showLeaderboard } from '../../actions/game';

const mapStateToProps = ({ currentPlayer, gameStarted, players, showLeaderboard, winner }) => {
  return { currentPlayer, gameStarted, players, showLeaderboard, winner };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLeaderboardClicked: () => dispatch(showLeaderboard())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
