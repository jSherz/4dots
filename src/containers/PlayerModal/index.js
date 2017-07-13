import { connect } from 'react-redux';
import { PlayerModal } from './PlayerModal';
import { startGame, updatePlayer } from '../../actions/game';
import { PLAYER_A, PLAYER_B } from '../../reducers/game';

const mapStateToProps = ({ players }) => {
  return { players };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => dispatch(startGame()),
    updatePlayerA: (event) => dispatch(updatePlayer(PLAYER_A, event.target.value)),
    updatePlayerB: (event) => dispatch(updatePlayer(PLAYER_B, event.target.value)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModal);
