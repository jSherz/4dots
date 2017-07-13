import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Players } from '../../model';
import { PLAYER_A, PLAYER_B } from '../../reducers/game';
import './PlayerModal.css';

export class PlayerModal extends Component {

  static propTypes = {
    players: PropTypes.shape(Players).isRequired,
    startGame: PropTypes.func.isRequired,
    updatePlayerA: PropTypes.func.isRequired,
    updatePlayerB: PropTypes.func.isRequired
  };

  render() {
    const playerA = this.props.players[ PLAYER_A ].name;
    const playerB = this.props.players[ PLAYER_B ].name;
    const { startGame, updatePlayerA, updatePlayerB } = this.props;

    return (
      <div id="player-modal-wrapper">
        <div id="player-modal">
          <ul>
            <li>
              <label htmlFor="player-a-name">Player A</label>
              <input id="player-a-name" value={playerA} onChange={updatePlayerA}/>
            </li>

            <li>
              <label htmlFor="player-b-name">Player B</label>
              <input id="player-b-name" value={playerB} onChange={updatePlayerB}/>
            </li>

            <li className="player-modal-controls">
              <button onClick={startGame}>Play</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}
