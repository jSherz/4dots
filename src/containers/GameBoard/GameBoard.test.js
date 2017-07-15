import React from 'react';
import { shallow } from 'enzyme';

import GameBoard from './GameBoard';
import GamePiece from '../../components/GamePiece';
import { Board, Players } from '../../model';
import { makeBoard } from '../../model/Board.test';

describe('GameBoard', () => {

  it('renders the correct game pieces', () => {
    const board = makeBoard(
      '_ _ _ _ _ _ A' +
      '_ _ _ _ _ A B' +
      '_ _ _ _ A B A' +
      '_ _ _ A B B B' +
      '_ _ B A B A A' +
      '_ B A B A A B'
    );

    const component = shallow(
      <GameBoard currentPlayer={Players.PLAYER_A} gameBoard={board}/>
    );

    // Sanity check: columns
    const columns = component.find('[className="GamePieceColumn"]');
    expect(columns.length).toEqual(7);

    columns.forEach((column, index) => {
      const piecesInColumn = column.find(GamePiece);
      expect(piecesInColumn.length).toEqual(6);

      piecesInColumn.forEach((pieceInColumn, picIndex) => {
        expect(pieceInColumn).toHaveProp('column', index);
        expect(pieceInColumn).toHaveProp('row', picIndex);
      });
    });

    // Check on pieces having correct item
    const pieces = component.find(GamePiece);
    expect(pieces.length).toEqual(42); // Num rows * num columns, see Board

    pieces.forEach((piece) => {
      const props = piece.props();
      const index = Board.coordToIndex(props.column, props.row);
      const playerAtIndexOnBoard = board.pieces[index];

      expect(props.player).toEqual(playerAtIndexOnBoard);
    });
  });

  describe('when the current player is A', () => {

    it('has the correct class', () => {
      const component = shallow(
        <GameBoard currentPlayer={Players.PLAYER_A} gameBoard={Board.create()}/>
      );

      expect(component.find('#game-board')).toHaveProp('className', 'CurrentPlayerIsA');
    });

  });

  describe('when the current player is B', () => {

    it('has the correct class', () => {
      const component = shallow(
        <GameBoard currentPlayer={Players.PLAYER_B} gameBoard={Board.create()}/>
      );

      expect(component.find('#game-board')).toHaveProp('className', 'CurrentPlayerIsB');
    });

  });

});
