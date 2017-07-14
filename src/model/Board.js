import PropTypes from 'prop-types';
import every from 'lodash/every';

import { Players } from './';

/**
 * All of the pieces are a valid player and are the same.
 */
const winningPieces = (pieces) => {
  return every(pieces, (piece) => piece === pieces[0]) && Players.VALID_PLAYERS.includes(pieces[0]);
};

/**
 * Pick four pieces from a board and check if they're all the same.
 */
const pickAndCheckPieces = (board, startColumn, startRow, columnFunc, rowFunc) => {
  const pieces = [];

  // Build the column
  for (let offset = 0; offset < Board.WIN_LENGTH; offset++) {
    // Calculate the change in column & row (direction)
    const index = Board.coordToIndex(columnFunc(startColumn, offset), rowFunc(startRow, offset));
    pieces.push(board.pieces[index]);
  }

  if (winningPieces(pieces)) {
    return pieces[0];
  } else {
    return null;
  }
};

/**
 * A view-agnostic representation of the game board. A list of pieces that are spread out from the top left to form the
 * 4dots board.
 */
export class Board {

  static NUM_COLUMNS = 7;
  static NUM_ROWS = 6;
  static WIN_LENGTH = 4;

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
      pieces.push(board.pieces[index]);
    }

    return pieces;
  }

  static lowestFreeSpace(board, column) {
    for (let row = (Board.NUM_ROWS - 1); row >= 0; row--) {
      const index = Board.coordToIndex(column, row);
      const piece = board.pieces[index];

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

      const newPieces = [...board.pieces];
      newPieces[nextIndex] = player;

      return new Board(newPieces);
    }

    return board;
  }

  static findWinner(board) {
    // Column
    for (let column = 0; column < Board.NUM_COLUMNS; column++) {
      for (let row = 0; row <= (Board.NUM_ROWS - Board.WIN_LENGTH); row++) {
        const winner = pickAndCheckPieces(board, column, row, (col) => col, (row, offset) => row + offset);

        if (winner) {
          return winner;
        }
      }
    }

    // Row
    for (let row = 0; row < Board.NUM_ROWS; row++) {
      for (let column = 0; column <= (Board.NUM_COLUMNS - Board.WIN_LENGTH); column++) {
        const winner = pickAndCheckPieces(board, column, row, (col, offset) => col + offset, (row) => row);

        if (winner) {
          return winner;
        }
      }
    }

    // Up and right diagonal
    for (let row = (Board.NUM_ROWS - 1); row >= 0; row--) {
      for (let column = 0; column <= (Board.NUM_COLUMNS - Board.WIN_LENGTH); column++) {
        const winner = pickAndCheckPieces(board, column, row, (col, offset) => col + offset, (row, offset) => row - offset);

        if (winner) {
          return winner;
        }
      }
    }

    // Up and left diagonal
    for (let row = (Board.NUM_ROWS - 1); row >= 0; row--) {
      for (let column = (Board.NUM_COLUMNS - 1); column >= (Board.WIN_LENGTH - 1); column--) {
        const winner = pickAndCheckPieces(board, column, row, (col, offset) => col - offset, (row, offset) => row - offset);

        if (winner) {
          return winner;
        }
      }
    }

    return null;
  }

  static create() {
    return new Board(new Array(Board.NUM_COLUMNS * Board.NUM_ROWS).fill(null));
  }

}

export default Board;
