import GamePiece from './GamePiece';
import { connect } from 'react-redux';
import { columnClicked } from '../../actions/game';

const mapDispatchToProps = (dispatch) => {
  return {
    onColumnClicked(column) {
      dispatch(columnClicked(column));
    }
  };
};

export default connect(null, mapDispatchToProps)(GamePiece);
