import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = ({ currentPlayer, gameStarted, players }) => {
  return { currentPlayer, gameStarted, players };
};

export default connect(mapStateToProps)(App);
