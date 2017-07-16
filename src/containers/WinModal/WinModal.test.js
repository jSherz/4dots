import React from 'react';
import { shallow } from 'enzyme';

import WinModal from './WinModal';
import { Player } from '../../model';

describe('WinModal', () => {

  it('shows the winner\'s name', () => {
    const winner = new Player('Bob');
    const component = shallow(
      <WinModal submitScore={jest.fn()} winner={winner}/>
    );

    expect(component.find('#win-modal p').at(0).text()).toEqual('Congratulations, Bob - you win!');
  });

  it('triggers the submit score function when the button is pressed', () => {
    const submitScore = jest.fn();
    const winner = new Player('Berty');

    const component = shallow(
      <WinModal submitScore={submitScore} winner={winner}/>
    );

    expect(submitScore).not.toHaveBeenCalled();

    component.find('#win-modal-controls button').simulate('click');

    expect(submitScore).toHaveBeenCalledWith(winner.name);
  });

});
