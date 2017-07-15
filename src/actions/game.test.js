import {
  columnClicked,
  resetGame,
  startGame,
  updateGameBoard,
  updatePlayer
} from './game';
import { Players } from '../model';

describe('actions/game', () => {

  describe('resetGame', () => {

    it('dispatches the correct action', () => {
      const action = resetGame();

      expect(action.type).toEqual('RESET_GAME');
    });

  });

  describe('updateGameBoard', () => {

    it('dispatches the correct action', () => {
      const dummyBoard = ['my', 'game', 'board'];
      const action = updateGameBoard(dummyBoard);

      expect(action.type).toEqual('UPDATE_GAME_BOARD');
      expect(action.payload).toEqual(dummyBoard);
    });

  });

  describe('columnClicked', () => {

    it('dispatches the correct action', () => {
      const action = columnClicked(4);

      expect(action.type).toEqual('PLACE_PIECE');
      expect(action.payload).toEqual(4);
    });

  });

  describe('updatePlayer', () => {

    it('dispatches the correct action', () => {
      const player = Players.PLAYER_A;
      const name = 'Evelyn';

      const action = updatePlayer(player, name);

      expect(action.type).toEqual('UPDATE_PLAYER');
      expect(action.payload.player).toEqual(player);
      expect(action.payload.name).toEqual(name);
    });

  });

  describe('startGame', () => {

    it('dispatches the correct action', () => {
      const action = startGame();

      expect(action.type).toEqual('START_GAME');
    });

  });

});
