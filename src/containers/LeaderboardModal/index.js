import { connect } from 'react-redux';

import { hideLeaderboard } from '../../actions/game';
import LeaderboardModal from './LeaderboardModal';

const mapStateToProps = ({ leaderboard }) => {
  return { leaderboard };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeButtonClicked: () => dispatch(hideLeaderboard())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardModal)
