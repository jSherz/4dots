import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import GameBoard from '../GameBoard';
import PlayerModal from '../PlayerModal';
import { Players } from '../../model';
import { PLAYER_A, PLAYER_B } from '../../reducers/game';

class App extends Component {

  static propTypes = {
    currentPlayer: PropTypes.oneOf([ PLAYER_A, PLAYER_B ]),
    gameStarted: PropTypes.bool.isRequired,
    players: PropTypes.shape(Players)
  };

  renderCurrentPlayer() {
    if (this.props.gameStarted) {
      const { currentPlayer, players } = this.props;
      const playerName = players[ currentPlayer ].name;

      return (
        <p id="intro">The current player is <strong>{playerName}</strong>.</p>
      );
    }

    return null;
  }

  render() {
    const { gameStarted } = this.props;

    return (
      <div id="app" className="App">
        <header>
          <h1>4dots</h1>
        </header>

        <section>
          {this.renderCurrentPlayer()}

          <GameBoard/>

          {gameStarted || <PlayerModal/>}
        </section>

        <footer>
          <p>For other wacky adventures, visit <a href="https://github.com/jSherz">jSherz on GitHub</a>.</p>
        </footer>
      </div>
    );
  }

}

export default App;
