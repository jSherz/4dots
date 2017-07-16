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
    submitScore: (name) => dispatch(submitScore(undefined, name)) // Pass undefined to get the default http client
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WinModal);
