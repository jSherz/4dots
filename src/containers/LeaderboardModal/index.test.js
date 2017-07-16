import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import { Leaderboard } from '../../model';
import LeaderboardModal from './LeaderboardModal';
import ConnectedLeaderboardModal from './index';

describe('LeaderboardModal (connected)', () => {

  it('maps state to props correctly', () => {
    const leaderboard = new Leaderboard([
      {
        name: 'Wendy',
        numWins: 313
      },
      {
        name: 'Laurence',
        numWins: 41
      }
    ]);

    const state = { leaderboard };
    const store = configureStore([])(state);

    const connectedComponent = mount(
      <Provider store={store}>
        <ConnectedLeaderboardModal/>
      </Provider>
    );

    const component = connectedComponent.find(LeaderboardModal);

    expect(component).toHaveProp('leaderboard', leaderboard);
  });

  it('dispatches the HIDE_LEADERBOARD action when the close button is clicked', () => {
    const leaderboard = new Leaderboard([
      {
        name: 'Ringo Star',
        numWins: 999
      }
    ]);

    const state = { leaderboard };
    const store = configureStore([])(state);

    const connectedComponent = mount(
      <Provider store={store}>
        <ConnectedLeaderboardModal/>
      </Provider>
    );

    const button = connectedComponent.find('button');
    button.simulate('click');

    expect(store.getActions().length).toEqual(1);

    const action = store.getActions()[0];
    expect(action.type).toEqual('HIDE_LEADERBOARD');
  });

});
