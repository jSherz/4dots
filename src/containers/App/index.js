import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = ({ currentPlayer, gameStarted, players, winner }) => {
  return { currentPlayer, gameStarted, players, winner };
};

export default connect(mapStateToProps)(App);
