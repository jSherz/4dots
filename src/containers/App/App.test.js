import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import PlayerModal from '../PlayerModal';
import GameBoard from '../GameBoard';
import { Player, Players } from '../../model';
import WinModal from '../WinModal';

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

    expect(component.find(WinModal)).toBeEmpty();
    expect(component.find(PlayerModal)).toBeEmpty();
    expect(component.find(GameBoard)).not.toBeEmpty();

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

    expect(component.find(WinModal)).toBeEmpty();
    expect(component.find(PlayerModal)).not.toBeEmpty();
    expect(component.find(GameBoard)).not.toBeEmpty();
  });

  it('renders the win modal when there\'s a winner', () => {
    const component = shallow(
      <App
        currentPlayer={Players.PLAYER_B}
        gameStarted
        players={players}
        winner={Players.PLAYER_B}
      />
    );

    expect(component.find(WinModal)).not.toBeEmpty();
    expect(component.find(PlayerModal)).toBeEmpty();
    expect(component.find(GameBoard)).not.toBeEmpty();
  });

});
