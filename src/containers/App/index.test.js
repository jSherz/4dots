import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import App from './App';
import ConnectedApp from './index';
import { Board, Leaderboard, LeaderboardEntry, Player, Players } from '../../model';

describe('App (connected)', () => {

  it('maps the correct properties from state', () => {
    const leaderboard = new Leaderboard([
      {
        name: 'David',
        numWins: 9
      },
      {
        name: 'Willis',
        numWins: 1
      }
    ]);
    const players = new Players(new Player('Norma Bates'), new Player('Norman Bates'));
    const state = {
      currentPlayer: Players.PLAYER_A,
      gameStarted: true,
      players: players,
      showLeaderboard: true,
      winner: Players.PLAYER_B,
      /* used by connected(GameBoard) that's also rendered */
      gameBoard: Board.create(),
      /* used by connected(LeaderboardModal) */
      leaderboard
    };
    const store = configureStore([])(state);

    const component = mount(
      <Provider store={store}>
        <ConnectedApp/>
      </Provider>
    );

    const app = component.find(App);
    expect(app).toHaveProp('currentPlayer', Players.PLAYER_A);
    expect(app).toHaveProp('gameStarted', true);
    expect(app).toHaveProp('players', players);
    expect(app).toHaveProp('winner', Players.PLAYER_B);
    expect(app).toHaveProp('showLeaderboard', true);
  });

  it('fires the correct action when the show leaderboard button is clicked', () => {
    const leaderboard = new Leaderboard([
      new LeaderboardEntry('Goliath', 9999),
      new LeaderboardEntry('David', 1)
    ]);
    const players = new Players(new Player('Norma Bates'), new Player('Norman Bates'));
    const state = {
      currentPlayer: Players.PLAYER_B,
      gameStarted: false,
      players: players,
      showLeaderboard: false,
      /* used by connected(GameBoard) that's also rendered */
      gameBoard: Board.create(),
      /* used by connected(LeaderboardModal) */
      leaderboard
    };
    const store = configureStore([])(state);

    const component = mount(
      <Provider store={store}>
        <ConnectedApp/>
      </Provider>
    );

    expect(store.getActions().length).toEqual(0);

    // Stub out axios
    const dummyGet = jest.fn();
    dummyGet.mockReturnValueOnce(leaderboard);

    const axios = require('axios');
    axios.get = dummyGet;

    component.find('#show-leaderboard button').simulate('click');

    expect(store.getActions().length).toEqual(1);

    const action = store.getActions()[0];
    expect(action.type).toEqual('SHOW_LEADERBOARD');
    expect(action.payload).toEqual(leaderboard);
  });

});
