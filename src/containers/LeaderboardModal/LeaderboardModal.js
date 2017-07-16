import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Leaderboard } from '../../model';
import Modal from '../../components/Modal';
import './LeaderboardModal.css';

export class LeaderboardModal extends Component {

  static propTypes = {
    closeButtonClicked: PropTypes.func.isRequired,
    leaderboard: PropTypes.shape(Leaderboard.propTypes).isRequired
  };

  renderPlayer(player) {
    return (
      <tr key={player.name}>
        <td className="leaderboard-player-name">{player.name}</td>
        <td className="leaderboard-player-wins">{player.numWins}</td>
      </tr>
    );
  }

  renderLeaderboardEntries() {
    const players = this.props.leaderboard.players;

    if (players && players.length >= 1) {
      return (
        <table id="leaderboard-results">
          <thead>
          <tr>
            <th>Player</th>
            <th># Wins</th>
          </tr>
          </thead>

          <tbody>
          {players.map(this.renderPlayer)}
          </tbody>
        </table>
      );
    } else {
      return (
        <div id="leaderboard-get-playing">
          <p>This is your chance! There are no players on the leaderboard... so get playing!!</p>
        </div>
      )
    }
  }

  render() {
    const { closeButtonClicked } = this.props;

    return (
      <Modal>
        <div id="leaderboard-modal">
          <h2>Leaderboard</h2>

          {this.renderLeaderboardEntries()}

          <p id="leaderboard-modal-controls">
            <button onClick={closeButtonClicked}>Close</button>
          </p>
        </div>
      </Modal>
    );
  }

}

export default LeaderboardModal;
