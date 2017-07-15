import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';

import ConnectedGamePiece from './index';
import { Players } from '../../model';

describe('GamePiece (connected)', () => {

  it('sends the column clicked action when clicked', () => {
    const store = configureStore([])({});

    const component = mount(
      <Provider store={store}>
        <ConnectedGamePiece column={3} player={Players.PLAYER_A} row={2} topPiece={false}/>
      </Provider>
    );

    expect(store.getActions().length).toEqual(0);

    component.find('div').simulate('click');

    expect(store.getActions().length).toEqual(1);

    const action = store.getActions()[0];
    expect(action.type).toEqual('PLACE_PIECE');
    expect(action.payload).toEqual(3);
  });

});
