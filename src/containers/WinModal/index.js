import { connect } from 'react-redux';

import WinModal from './WinModal';

const mapStateToProps = (state) => {
  return {
    winner: state.players[state.winner]
  };
};

export default connect(mapStateToProps)(WinModal);
