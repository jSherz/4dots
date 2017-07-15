import React from 'react';
import { shallow, mount } from 'enzyme';

import PlayerModal from './PlayerModal';
import { Player, Players } from '../../model';

describe('PlayerModal', () => {

  const players = new Players(new Player('Dr Evil'), new Player('Austin'));
  const fn = jest.fn();

  it('displays player names', () => {
    const component = shallow(
      <PlayerModal players={players} startGame={fn} updatePlayerA={fn} updatePlayerB={fn}/>
    );

    expect(component.find('#player-a-name')).toHaveProp('value', 'Dr Evil');
    expect(component.find('#player-b-name')).toHaveProp('value', 'Austin');
  });

  it('calls the change functions when the relevant name is changed', () => {
    const updatePlayerA = jest.fn();
    const updatePlayerB = jest.fn();

    const component = shallow(
      <PlayerModal
        players={players}
        startGame={fn}
        updatePlayerA={updatePlayerA}
        updatePlayerB={updatePlayerB}
      />
    );

    expect(updatePlayerA).not.toHaveBeenCalled();
    expect(updatePlayerB).not.toHaveBeenCalled();

    component.find('#player-a-name').simulate('change', 'Dr. Evil');

    expect(updatePlayerA).toHaveBeenCalledWith('Dr. Evil');
    expect(updatePlayerB).not.toHaveBeenCalled();

    component.find('#player-b-name').simulate('change', 'AUSTIN!!!');

    expect(updatePlayerB).toHaveBeenCalledWith('AUSTIN!!!');
  });

  it('calls the start game function when the button is clicked', () => {
    const startGame = jest.fn();

    const component = shallow(
      <PlayerModal players={players} startGame={startGame} updatePlayerA={fn} updatePlayerB={fn}/>
    );

    expect(startGame).not.toHaveBeenCalled();

    component.find('.player-modal-controls button').simulate('click');

    expect(startGame).toHaveBeenCalled();
  });

  it('disables the button if either player name is not present', () => {
    const examples = [
      new Players(new Player('Dr Evil'), new Player('')),
      new Players(new Player(''), new Player('Austin')),
      new Players(new Player(''), new Player(''))
    ];

    examples.forEach((example) => {
      const component = shallow(
        <PlayerModal players={example} startGame={fn} updatePlayerA={fn} updatePlayerB={fn}/>
      );

      expect(component.find('.player-modal-controls button')).toHaveProp('disabled', 'disabled');
    });
  });

});
