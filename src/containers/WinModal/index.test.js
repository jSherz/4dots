import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import WinModal from './WinModal';
import ConnectedWinModal from './index';
import { Player, Players } from '../../model';

describe('WinModal (connected)', () => {

  it('should map the correct state to props', () => {
    const state = {
      players: new Players(new Player('Milkybarkid'), new Player('Roman')),
      winner: Players.PLAYER_A
    };
    const store = configureStore([])(state);

    const component = mount(
      <Provider store={store}>
        <ConnectedWinModal/>
      </Provider>
    );

    expect(component.find(WinModal)).toHaveProp('winner', new Player('Milkybarkid'));
  });

  it('should send the correct action when the submit score button is clicked', () => {
    const state = {
      players: new Players(new Player('Rachael'), new Player('Stormzy')),
      winner: Players.PLAYER_B
    };
    const store = configureStore([])(state);

    const component = mount(
      <Provider store={store}>
        <ConnectedWinModal/>
      </Provider>
    );

    expect(store.getActions().length).toEqual(0);

    component.find('button').simulate('click');

    expect(store.getActions().length).toEqual(1);

    const action = store.getActions()[0];
    expect(action.type).toEqual('SUBMIT_SCORE');
  });

});
