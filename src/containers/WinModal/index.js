import { connect } from 'react-redux';

import WinModal from './WinModal';
import { submitScore } from '../../actions/game';

const mapStateToProps = (state) => {
  return {
    winner: state.players[state.winner]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitScore: () => dispatch(submitScore())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WinModal);
