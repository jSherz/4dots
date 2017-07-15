import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import GameBoard from '../GameBoard';
import PlayerModal from '../PlayerModal';
import { Players } from '../../model';
import WinModal from '../WinModal';

class App extends Component {

  static propTypes = {
    currentPlayer: PropTypes.oneOf(Players.VALID_PLAYERS).isRequired,
    gameStarted: PropTypes.bool.isRequired,
    players: PropTypes.shape(Players.propTypes).isRequired,
    winner: PropTypes.string
  };

  renderCurrentPlayer() {
    if (this.props.gameStarted) {
      const { currentPlayer, players } = this.props;
      const playerName = players[currentPlayer].name;

      return (
        <p id="intro">The current player is <strong>{playerName}</strong>.</p>
      );
    }

    return null;
  }

  render() {
    const { gameStarted, winner } = this.props;

    return (
      <div id="app" className="App">
        <header>
          <h1>4dots</h1>
        </header>

        <section>
          {this.renderCurrentPlayer()}

          <GameBoard/>

          {gameStarted || <PlayerModal/>}
          {winner && <WinModal/>}
        </section>

        <footer>
          <p>For other wacky adventures, visit <a href="https://github.com/jSherz">jSherz on GitHub</a>.</p>
        </footer>
      </div>
    );
  }

}

export default App;
