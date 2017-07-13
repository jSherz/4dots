export class Board {

  static NUM_COLUMNS = 7;
  static NUM_ROWS = 6;

  pieces;

  constructor(pieces) {
    this.pieces = pieces;
  }

  static coordToIndex(x, y) {
    return (y * Board.NUM_COLUMNS) + x;
  }

  static indexToCoord(index) {
    return {
      x: Math.floor(index / Board.NUM_COLUMNS),
      y: index % Board.NUM_COLUMNS
    };
  }

  static piecesInColumn(board, column) {
    const pieces = [];

    for (let row = 0; row < Board.NUM_ROWS; row++) {
      const index = Board.coordToIndex(row, column);
      pieces.push(board.pieces[ index ]);
    }

    return pieces;
  }

  static playPiece(board, column) {
    const numPiecesInColumn = Board.piecesInColumn(board, column).length;

    // Ensure we have space to play a piece here
    if (numPiecesInColumn < Board.NUM_ROWS) {

    }
  }

}

export default Board;
