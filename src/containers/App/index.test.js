import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import App from './App';
import ConnectedApp from './index';
import { Board, Player, Players } from '../../model';

describe('App (connected)', () => {

  it('maps the correct properties from state', () => {
    const players = new Players(new Player('Norma Bates'), new Player('Norman Bates'));
    const state = {
      currentPlayer: Players.PLAYER_A,
      gameStarted: true,
      players: players,
      winner: Players.PLAYER_B,
      /* not used by App, but will be required by the connected(GameBoard) that's also rendered */
      gameBoard: Board.create()
    };
    const store = configureStore([])(state);

    const component = mount(
      <Provider store={store}>
        <ConnectedApp/>
      </Provider>
    );

    expect(component.find(App)).toHaveProp('currentPlayer', Players.PLAYER_A);
    expect(component.find(App)).toHaveProp('gameStarted', true);
    expect(component.find(App)).toHaveProp('players', players);
    expect(component.find(App)).toHaveProp('winner', Players.PLAYER_B);
  });

});
