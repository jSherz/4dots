import React from 'react';
import { shallow } from 'enzyme';

import GamePiece from './GamePiece';
import { Players } from '../../model';

describe('GamePiece', () => {

  it('has no image or top piece class by default', () => {
    const onClicked = jest.fn();

    const component = shallow(
      <GamePiece column={0} onColumnClicked={onClicked} row={0} topPiece={false}/>
    );

    expect(component.find('img')).toBeEmpty();
    expect(component.props().className.trim()).toEqual('GamePiece');
    expect(onClicked).not.toHaveBeenCalled();
  });

  it('has no image when showing the "none" player', () => {
    const onClicked = jest.fn();

    const component = shallow(
      <GamePiece column={0} onColumnClicked={onClicked} player={Players.PLAYER_NONE} row={0} topPiece={false}/>
    );

    expect(component.find('img')).toBeEmpty();
    expect(onClicked).not.toHaveBeenCalled();
  });

  it('has the correct class if it\'s the top piece', () => {
    const onClicked = jest.fn();

    const component = shallow(
      <GamePiece column={2} onColumnClicked={onClicked} player={Players.PLAYER_A} row={5} topPiece/>
    );

    expect(component.props().className).toContain('GamePieceTop');
    expect(onClicked).not.toHaveBeenCalled();
  });

  it('fires the correct method when clicked', () => {
    const onClicked = jest.fn();

    const component = shallow(
      <GamePiece column={4} onColumnClicked={onClicked} player={Players.PLAYER_B} row={3} topPiece/>
    );

    expect(onClicked).not.toHaveBeenCalled();

    component.find('div').simulate('click');

    expect(onClicked).toHaveBeenCalled();
  });

  describe('when showing player A', () => {

    it('has the correct image', () => {
      const onClicked = jest.fn();

      const component = shallow(
        <GamePiece column={6} onColumnClicked={onClicked} player={Players.PLAYER_A} row={2} topPiece={false}/>
      );

      expect(component.find('img')).toHaveProp('src', 'lemon.png');
      expect(component.find('img')).toHaveProp('alt', 'Player A');
      expect(component.find('img')).toHaveProp('className', 'GamePieceLemon');

      expect(onClicked).not.toHaveBeenCalled();
    });

  });

  describe('when showing player B', () => {

    it('has the correct image', () => {
      const onClicked = jest.fn();

      const component = shallow(
        <GamePiece column={1} onColumnClicked={onClicked} player={Players.PLAYER_B} row={6} topPiece={false}/>
      );

      expect(component.find('img')).toHaveProp('src', 'watermelon.png');
      expect(component.find('img')).toHaveProp('alt', 'Player B');
      expect(component.find('img')).toHaveProp('className', 'GamePieceWatermelon');

      expect(onClicked).not.toHaveBeenCalled();
    });

  });

});