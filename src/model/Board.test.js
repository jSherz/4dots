import React from 'react';

import Board from './Board';
import Players from './Players';

const PLAYER_A = Players.PLAYER_A;
const PLAYER_B = Players.PLAYER_B;
const PLAYER_NONE = Players.PLAYER_NONE;

/**
 * Test data can be a PITA, so make it easier to construct a board from an ASCII representation.
 * @param art
 */
const makeBoard = (art) => {
  const stripped = art.replace(/[ \\n]/g, '');

  const asciiToPlayer = (ascii) => {
    switch (ascii) {
      case 'A':
        return Players.PLAYER_A;
      case 'B':
        return Players.PLAYER_B;
      case '_':
        return Players.PLAYER_NONE;
      default:
        throw new Error('This is not the test data method you are looking for. ' +
          `'${ascii}' is invalid`);
    }
  };

  return new Board(stripped.split('').map(asciiToPlayer));
};

/**
 * A board looks like this (where the number is the index):
 *
 *      0 |  1 |  2 |  3 |  4 |  5 |  6
 *   ------------------------------------
 * 0 |  0 |  1 |  2 |  3 |  4 |  5 |  6 |
 *   ------------------------------------
 * 1 |  7 |  8 |  9 | 10 | 11 | 12 | 13 |
 *   ------------------------------------
 * 2 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
 *   ------------------------------------
 * 3 | 21 | 22 | 23 | 24 | 25 | 26 | 27 |
 *   ------------------------------------
 * 4 | 28 | 29 | 30 | 31 | 32 | 33 | 34 |
 *   ------------------------------------
 * 5 | 35 | 36 | 37 | 38 | 39 | 40 | 41 |
 *   ------------------------------------
 */
describe('Board', () => {

  describe('coordToIndex', () => {

    it('calculates the correct index', () => {
      const examples = [
        // 4 corners
        { x: 0, y: 0, expected: 0 },
        { x: 6, y: 0, expected: 6 },
        { x: 0, y: 5, expected: 35 },
        { x: 6, y: 5, expected: 41 },
        // random other squares
        { x: 2, y: 4, expected: 30 },
        { x: 5, y: 4, expected: 33 }
      ];

      examples.forEach((example) => {
        expect(Board.coordToIndex(example.x, example.y)).toEqual(example.expected);
      });
    });

  });

  describe('indexToCoord', () => {

    it('calculates the correct column & row', () => {
      const examples = [
        // 4 corners
        { index: 0, x: 0, y: 0 },
        { index: 6, x: 6, y: 0 },
        { index: 35, x: 0, y: 5 },
        { index: 41, x: 6, y: 5 },
        // random other squares
        { index: 30, x: 2, y: 4 },
        { index: 33, x: 5, y: 4 }
      ];

      examples.forEach((example) => {
        const actual = Board.indexToCoord(example.index);

        expect(actual.x).toEqual(example.x);
        expect(actual.y).toEqual(example.y);
      });
    });

  });

  describe('piecesInColumn', () => {

    it('returns the correct pieces for a column', () => {
      const board = makeBoard(
        'A _ _ _ _ _ _' +
        'B _ _ _ _ _ _' +
        'A _ _ A _ _ _' +
        'B _ _ B _ B _' +
        'A _ _ A _ A _' +
        'B B B B A B _'
      );

      const expected = [
        [PLAYER_A, PLAYER_B, PLAYER_A, PLAYER_B, PLAYER_A, PLAYER_B],
        [PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_B],
        [PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_B],
        [PLAYER_NONE, PLAYER_NONE, PLAYER_A, PLAYER_B, PLAYER_A, PLAYER_B],
        [PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_A],
        [PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_B, PLAYER_A, PLAYER_B],
        [PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_NONE, PLAYER_NONE]
      ];

      expected.forEach((example, column) => {
        const actual = Board.piecesInColumn(board, column);
        expect(actual).toEqual(example)
      });
    });

  });

  describe('lowestFreeSpace', () => {

    it('identifies the correct lowest free space', () => {
      const board = makeBoard(
        'A _ _ _ _ _ _' +
        'A B _ _ _ _ _' +
        'A B A _ _ _ _' +
        'A B A B _ _ _' +
        'A B A B A _ _' +
        'A B A B A B _'
      );

      const expected = [null, 1, 9, 17, 25, 33, 41];

      expected.forEach((example, column) => {
        const actual = Board.lowestFreeSpace(board, column);
        expect(actual).toEqual(example)
      });
    });

  });

  describe('playPiece', () => {

    it('won\'t let a user play in a full column', () => {
      const board = makeBoard(
        '_ _ A _ _ _ _' +
        '_ _ B _ _ _ _' +
        '_ _ A _ _ _ _' +
        '_ _ B _ _ _ _' +
        '_ _ B _ _ _ _' +
        '_ _ B A B B _'
      );

      const result = Board.playPiece(board, 2, PLAYER_A);

      expect(result).toEqual(board); // No change
    });

    it('will let you play a few moves', () => {
      const stage1 = makeBoard(
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _'
      );

      const stage2 = makeBoard(
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ A _ _ _ _'
      );

      expect(Board.playPiece(stage1, 2, PLAYER_A)).toEqual(stage2);

      const stage3 = makeBoard(
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ A B _ _ _'
      );

      expect(Board.playPiece(stage2, 3, PLAYER_B)).toEqual(stage3);

      const stage4 = makeBoard(
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ A _ _ _ _' +
        '_ _ A B _ _ _'
      );

      expect(Board.playPiece(stage3, 2, PLAYER_A)).toEqual(stage4);

      const stage5 = makeBoard(
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ A _ _ _ _' +
        '_ _ A B B _ _'
      );

      expect(Board.playPiece(stage4, 4, PLAYER_B)).toEqual(stage5);
    });

  });

  describe('findWinner', () => {

    it('with no winner, returns null', () => {
      const board = makeBoard(
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ A _ _ _ _' +
        '_ _ B B B A _'
      );

      expect(Board.findWinner(board)).toEqual(null);
    });

    it('finds a winner in a column', () => {
      const examples = [
        makeBoard(
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          'A _ _ _ _ _ _' +
          'A _ _ _ _ _ _' +
          'A _ _ _ _ B _' +
          'A _ B B B A _'
        ),
        makeBoard(
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ B' +
          'A _ _ A _ _ B' +
          'A _ A A _ B B' +
          'A _ B B B A B'
        ),
        makeBoard(
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ A A _ _ _' +
          '_ _ A B B _ _' +
          '_ _ A A B _ _' +
          '_ _ A B B _ _'
        )
      ];

      const expected = [PLAYER_A, PLAYER_B, PLAYER_A];

      examples.forEach((example, index) => {
        expect(Board.findWinner(example)).toEqual(expected[index]);
      })
    });

    it('finds a winner in a row', () => {
      const examples = [
        makeBoard(
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ A _' +
          '_ B B B B A _'
        ),
        makeBoard(
          '_ B B B B A _' +
          '_ A A B A A _' +
          '_ B A B B B _' +
          '_ A B A A A _' +
          '_ B A A B A _' +
          '_ A A A B A _'
        ),
        makeBoard(
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ B A A A A' +
          '_ B A B A B B'
        )
      ];

      const expected = [PLAYER_B, PLAYER_B, PLAYER_A];

      examples.forEach((example, index) => {
        expect(Board.findWinner(example)).toEqual(expected[index]);
      })
    });

    it('finds a winner on a up and right diagonal', () => {
      const examples = [
        makeBoard(
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ B _ _ _' +
          '_ _ B A _ _ _' +
          '_ B B A A _ _' +
          'B A A A B _ _'
        ),
        makeBoard(
          '_ _ _ _ _ _ A' +
          '_ _ _ _ _ A B' +
          '_ _ _ _ A B A' +
          '_ _ _ A B B B' +
          '_ _ B A B A A' +
          '_ B A B A A B'
        ),
        makeBoard(
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ A _' +
          '_ _ _ _ A B _' +
          '_ _ _ A B A _' +
          '_ _ A B B B _' +
          '_ B A B A A _'
        )
      ];

      const expected = [PLAYER_B, PLAYER_A, PLAYER_A];

      examples.forEach((example, index) => {
        expect(Board.findWinner(example)).toEqual(expected[index]);
      });
    });

    it('finds a winner on a up and left diagonal', () => {
      const examples = [
        makeBoard(
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ B _ _ _' +
          '_ _ _ A B _ _' +
          '_ _ A A B B _' +
          '_ _ B A A A B'
        ),
        makeBoard(
          'A _ _ _ _ _ _' +
          'B A _ _ _ _ _' +
          'A B A _ _ _ _' +
          'B B B A _ _ _' +
          'A A B A B _ _' +
          'B A A B A B _'
        ),
        makeBoard(
          '_ _ _ _ _ _ _' +
          '_ A _ _ _ _ _' +
          '_ B A _ _ _ _' +
          '_ A B A _ _ _' +
          '_ B B B A _ _' +
          '_ A A B A B _'
        )
      ];

      const expected = [PLAYER_B, PLAYER_A, PLAYER_A];

      examples.forEach((example, index) => {
        expect(Board.findWinner(example)).toEqual(expected[index]);
      });
    });

  });

});
