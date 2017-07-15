import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import PlayerModal from './PlayerModal';
import ConnectedPlayerModal from './index';
import { Player, Players } from '../../model';

describe('PlayerModal (connected)', () => {

  it('maps the correct state to props', () => {
    const state = {
      players: new Players(new Player('Heisenbug'), new Player('Flakytest'))
    };
    const store = configureStore([])(state);

    const component = mount(
      <Provider store={store}>
        <ConnectedPlayerModal/>
      </Provider>
    );

    expect(component.find(PlayerModal)).toHaveProp('players', state.players);
  });

  it('dispatches the correct action when the start game button is clicked', () => {
    const state = {
      players: new Players(new Player('Neeraj'), new Player('Harriet'))
    };
    const store = configureStore([])(state);

    const component = mount(
      <Provider store={store}>
        <ConnectedPlayerModal/>
      </Provider>
    );

    expect(store.getActions().length).toEqual(0);

    component.find('.player-modal-controls button').simulate('click');

    expect(store.getActions().length).toEqual(1);

    const action = store.getActions()[0];
    expect(action.type).toEqual('START_GAME');
  });

  it('dispatches the correct action when player A\'s name is changed', () => {
    const state = {
      players: new Players(new Player('Skywalker'), new Player('Vader'))
    };
    const store = configureStore([])(state);

    const component = mount(
      <Provider store={store}>
        <ConnectedPlayerModal/>
      </Provider>
    );

    expect(store.getActions().length).toEqual(0);

    component.find('#player-a-name').simulate('change', { target: { value: 'Skyw4lk3r' }});

    expect(store.getActions().length).toEqual(1);

    const action = store.getActions()[0];
    expect(action.type).toEqual('UPDATE_PLAYER');
    expect(action.payload.player).toEqual(Players.PLAYER_A);
    expect(action.payload.name).toEqual('Skyw4lk3r');
  });

  it('dispatches the correct action when player B\'s name is changed', () => {
    const state = {
      players: new Players(new Player('Frankenstein'), new Player('Monster'))
    };
    const store = configureStore([])(state);

    const component = mount(
      <Provider store={store}>
        <ConnectedPlayerModal/>
      </Provider>
    );

    expect(store.getActions().length).toEqual(0);

    component.find('#player-b-name').simulate('change', { target: { value: 'M0nst3r' }});

    expect(store.getActions().length).toEqual(1);

    const action = store.getActions()[0];
    expect(action.type).toEqual('UPDATE_PLAYER');
    expect(action.payload.player).toEqual(Players.PLAYER_B);
    expect(action.payload.name).toEqual('M0nst3r');
  });

});
