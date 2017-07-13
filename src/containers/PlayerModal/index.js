import { connect } from 'react-redux';

import { PlayerModal } from './PlayerModal';
import { startGame, updatePlayer } from '../../actions/game';
import { Players } from '../../model';

const mapStateToProps = ({ players }) => {
  return { players };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => dispatch(startGame()),
    updatePlayerA: (event) => dispatch(updatePlayer(Players.PLAYER_A, event.target.value)),
    updatePlayerB: (event) => dispatch(updatePlayer(Players.PLAYER_B, event.target.value)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModal);
