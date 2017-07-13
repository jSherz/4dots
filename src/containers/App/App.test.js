import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import PlayerModal from '../PlayerModal';
import GameBoard from '../GameBoard';
import { Player, Players } from '../../model';

describe('components/App', () => {

  const players = new Players(new Player('James'), new Player('Graeme'));

  it('renders with the correct intro when the game has started', () => {
    const component = shallow(
      <App
        currentPlayer={Players.PLAYER_A}
        gameStarted
        players={players}
      />
    );

    expect(component.find(PlayerModal).length).toEqual(0);
    expect(component.find(GameBoard).length).toEqual(1);

    const intro = component.find('#intro');
    expect(intro.render().text()).toEqual('The current player is James.');
  });

  it('renders the player setup modal when the game hasn\'t started', () => {
    const component = shallow(
      <App
        currentPlayer={Players.PLAYER_B}
        gameStarted={false}
        players={players}
      />
    );

    expect(component.find(PlayerModal).length).toEqual(1);
    expect(component.find(GameBoard).length).toEqual(1);
  });

});
