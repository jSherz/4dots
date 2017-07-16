import React from 'react';
import { shallow } from 'enzyme';

import LeaderboardModal from './LeaderboardModal';
import { Leaderboard, LeaderboardEntry } from '../../model';

describe('LeaderboardModal', () => {

  const leaderboard = new Leaderboard([
    new LeaderboardEntry('Hermione', 101),
    new LeaderboardEntry('Harry', 91),
    new LeaderboardEntry('Ronald', 14)
  ]);

  it('has the correct entries', () => {
    const component = shallow(
      <LeaderboardModal
        closeButtonClicked={jest.fn()}
        leaderboard={leaderboard}
      />
    );

    const columnHeaders = component.find('table thead tr');
    expect(columnHeaders.length).toEqual(1);
    expect(columnHeaders.find('th').at(0).render().text()).toEqual('Player');
    expect(columnHeaders.find('th').at(1).render().text()).toEqual('# Wins');

    const results = component.find('table tbody tr');

    expect(results.length).toEqual(3);
    const firstPlayerName = results.at(0).find('td').at(0);
    const firstPlayerNumWins = results.at(0).find('td').at(1);
    expect(firstPlayerName.render().text()).toEqual('Hermione');
    expect(firstPlayerNumWins.render().text()).toEqual('101');

    const secondPlayerName = results.at(1).find('td').at(0);
    const secondPlayerNumWins = results.at(1).find('td').at(1);
    expect(secondPlayerName.render().text()).toEqual('Harry');
    expect(secondPlayerNumWins.render().text()).toEqual('91');

    const thirdPlayerName = results.at(2).find('td').at(0);
    const thirdPlayerNumWins = results.at(2).find('td').at(1);
    expect(thirdPlayerName.render().text()).toEqual('Ronald');
    expect(thirdPlayerNumWins.render().text()).toEqual('14');
  });

  it('displays a "get playing" message if no players are on the board', () => {
    const component = shallow(
      <LeaderboardModal
        closeButtonClicked={jest.fn()}
        leaderboard={new Leaderboard([])}
      />
    );

    expect(component.find('#leaderboard-get-playing')).not.toBeEmpty();
    expect(component.find('table')).toBeEmpty();
  });

  it('fires the correct function when the close button is clicked', () => {
    const closeButtonClicked = jest.fn();

    const component = shallow(
      <LeaderboardModal
        closeButtonClicked={closeButtonClicked}
        leaderboard={leaderboard}
      />
    );

    expect(closeButtonClicked).not.toHaveBeenCalled();

    component.find('button').simulate('click');

    expect(closeButtonClicked).toHaveBeenCalled();
  });

});
