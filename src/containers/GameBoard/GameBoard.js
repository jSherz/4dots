import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GamePiece from '../../components/GamePiece';
import { Board, Players } from '../../model';

export class GameBoard extends Component {

  static propTypes = {
    currentPlayer: PropTypes.oneOf(Players.VALID_PLAYERS).isRequired,
    gameBoard: PropTypes.shape(Board.propTypes).isRequired
  };

  renderPieces() {
    const { gameBoard } = this.props;
    const columns = [];

    for (let column = 0; column < Board.NUM_COLUMNS; column++) {
      const rowPieces = [];

      for (let row = 0; row < Board.NUM_ROWS; row++) {
        const player = gameBoard.pieces[ Board.coordToIndex(column, row) ];

        rowPieces.push(
          <GamePiece
            column={column}
            key={`piece_${column}_${row}`}
            player={player || PLAYER_NONE}
            row={row}
            topPiece={row === 0}
          />
        );
      }

      const key = `game-piece-column-${column}`;

      columns.push(
        <div
          className="GamePieceColumn"
          id={key}
          key={key}
        >
          {rowPieces}
        </div>
      );
    }

    return (
      <div id="game-pieces">
        {columns}

        <div style={{ clear: 'both' }}/>
      </div>
    );
  }

  render() {
    const { currentPlayer } = this.props;
    const className = currentPlayer === Players.PLAYER_A ? 'CurrentPlayerIsA' : 'CurrentPlayerIsB';

    return (
      <div id="game-board" className={className}>
        {this.renderPieces()}
      </div>
    );
  }

}

export default GameBoard;
