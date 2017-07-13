import PropTypes from 'prop-types';

import { Players } from './';

export class Board {

  static NUM_COLUMNS = 7;
  static NUM_ROWS = 6;

  static propTypes = {
    pieces: PropTypes.arrayOf(PropTypes.number)
  };

  pieces;

  constructor(pieces) {
    this.pieces = pieces;
  }

  static coordToIndex(column, row) {
    return (row * Board.NUM_COLUMNS) + column;
  }

  static indexToCoord(index) {
    return {
      x: index % Board.NUM_COLUMNS,
      y: Math.floor(index / Board.NUM_COLUMNS)
    };
  }

  static piecesInColumn(board, column) {
    const pieces = [];

    for (let row = 0; row < Board.NUM_ROWS; row++) {
      const index = Board.coordToIndex(column, row);
      pieces.push(board.pieces[ index ]);
    }

    return pieces;
  }

  static lowestFreeSpace(board, column) {
    for (let row = (Board.NUM_ROWS - 1); row >= 0; row--) {
      const index = Board.coordToIndex(column, row);
      const piece = board.pieces[ index ];

      if (!piece || piece === Players.PLAYER_NONE) {
        return index;
      }
    }

    return null;
  }

  static playPiece(board, column, player) {
    // Find truthy pieces (ones that have been played)
    const numPiecesInColumn =
      Board
        .piecesInColumn(board, column)
        .filter((p) => p === Players.PLAYER_A || p === Players.PLAYER_B)
        .length;

    // Ensure we have space to play a piece here
    if (numPiecesInColumn < Board.NUM_ROWS) {
      const nextIndex = Board.lowestFreeSpace(board, column);

      const newPieces = [ ...board.pieces ];
      newPieces[ nextIndex ] = player;

      return new Board(newPieces);
    }

    return board;
  }

  static create() {
    return new Board(new Array(Board.NUM_COLUMNS * Board.NUM_ROWS).fill(null));
  }

}

export default Board;
