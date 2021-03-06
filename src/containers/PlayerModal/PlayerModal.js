import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Players } from '../../model';
import './PlayerModal.css';
import Modal from '../../components/Modal';

export class PlayerModal extends Component {

  static propTypes = {
    players: PropTypes.shape(Players.propTypes).isRequired,
    startGame: PropTypes.func.isRequired,
    updatePlayerA: PropTypes.func.isRequired,
    updatePlayerB: PropTypes.func.isRequired
  };

  render() {
    const playerA = this.props.players[Players.PLAYER_A].name;
    const playerB = this.props.players[Players.PLAYER_B].name;
    const { startGame, updatePlayerA, updatePlayerB } = this.props;
    const canContinue = playerA.length >= 1 && playerB.length >= 1;

    return (
      <Modal>
        <ul id="player-modal">
          <li>
            <label htmlFor="player-a-name">Player A</label>
            <input id="player-a-name" value={playerA} onChange={updatePlayerA}/>
          </li>

          <li>
            <label htmlFor="player-b-name">Player B</label>
            <input id="player-b-name" value={playerB} onChange={updatePlayerB}/>
          </li>

          <li className="player-modal-controls">
            <button
              disabled={canContinue ? null : 'disabled'}
              onClick={startGame}
            >Play</button>
          </li>
        </ul>
      </Modal>
    );
  }

}

export default PlayerModal;
