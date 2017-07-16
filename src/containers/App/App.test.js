import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import PlayerModal from '../PlayerModal';
import GameBoard from '../GameBoard';
import { Player, Players } from '../../model';
import WinModal from '../WinModal';
import LeaderboardModal from '../LeaderboardModal';

describe('components/App', () => {

  const players = new Players(new Player('James'), new Player('Graeme'));

  it('renders with the correct intro when the game has started', () => {
    const component = shallow(
      <App
        currentPlayer={Players.PLAYER_A}
        gameStarted
        players={players}
        showLeaderboard={false}
        showLeaderboardClicked={jest.fn()}
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
        showLeaderboard={false}
        showLeaderboardClicked={jest.fn()}
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
        showLeaderboard={false}
        showLeaderboardClicked={jest.fn()}
        winner={Players.PLAYER_B}
      />
    );

    expect(component.find(WinModal)).not.toBeEmpty();
    expect(component.find(PlayerModal)).toBeEmpty();
    expect(component.find(GameBoard)).not.toBeEmpty();
  });

  it('fires the correct function when the show leaderboard button is pressed', () => {
    const showLeaderboardClicked = jest.fn();
    const component = shallow(
      <App
        currentPlayer={Players.PLAYER_B}
        gameStarted
        players={players}
        showLeaderboard={false}
        showLeaderboardClicked={showLeaderboardClicked}
      />
    );

    expect(showLeaderboardClicked).not.toHaveBeenCalled();

    component.find('#show-leaderboard button').simulate('click');

    expect(showLeaderboardClicked).toHaveBeenCalled();
  });

  it('renders the leaderboard if showLeaderboard=true', () => {
    const component = shallow(
      <App
        currentPlayer={Players.PLAYER_B}
        gameStarted
        players={players}
        showLeaderboard
        showLeaderboardClicked={jest.fn()}
      />
    );

    const leaderboard = component.find(LeaderboardModal);

    expect(leaderboard).not.toBeEmpty();
  });

});
