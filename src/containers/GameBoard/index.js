import { connect } from 'react-redux';

import GameBoard from './GameBoard';

const mapStateToProps = ({ currentPlayer, gameBoard }) => {
  return { currentPlayer, gameBoard }
};

export default connect(mapStateToProps)(GameBoard);
