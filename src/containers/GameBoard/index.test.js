import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import GameBoard from './GameBoard';
import ConnectedGameBoard from './index';
import { Players } from '../../model';
import { makeBoard } from '../../model/Board.test';

describe('GameBoard (connected)', () => {

  it('maps the correct state to props', () => {
    const board = makeBoard(
      '_ _ _ _ _ _ _' +
      '_ _ _ _ _ _ _' +
      '_ _ _ B _ _ _' +
      '_ _ _ A B _ _' +
      '_ _ A A B B _' +
      '_ _ B A A A B'
    );

    const state = {
      currentPlayer: Players.PLAYER_A,
      gameBoard: board
    };
    const store = configureStore([])(state);

    const component = mount(
      <Provider store={store}>
        <ConnectedGameBoard currentPlayer="" gameBoard=""/>
      </Provider>
    );

    const innerBoardComponent = component.find(GameBoard);
    expect(innerBoardComponent).toHaveProp('currentPlayer', Players.PLAYER_A);
    expect(innerBoardComponent).toHaveProp('gameBoard', board);
  });

});
