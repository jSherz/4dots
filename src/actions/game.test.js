import {
  columnClicked,
  hideLeaderboard,
  resetGame,
  startGame,
  showLeaderboard,
  submitScore,
  updateGameBoard,
  updateLeaderboard,
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

  describe('submitScore', () => {

    it('dispatches the correct action', () => {
      const action = submitScore();

      expect(action.type).toEqual('SUBMIT_SCORE');
    });

  });

  describe('showLeaderboard', () => {

    it('dispatches the correct action', () => {
      const dummyGet = jest.fn();
      dummyGet.mockReturnValueOnce('dummy-axios-result');

      const dummyHttpClient = { get: dummyGet };

      const action = showLeaderboard(dummyHttpClient);

      expect(action.type).toEqual('SHOW_LEADERBOARD');
      expect(action.payload).toEqual('dummy-axios-result');
      expect(dummyGet).toHaveBeenCalledWith('https://4dots-api.jsherz.com/leaderboard');
    });

  });

  describe('hideLeaderboard', () => {

    it('dispatches the correct action', () => {
      const action = hideLeaderboard();

      expect(action.type).toEqual('HIDE_LEADERBOARD');
    });

  });

});
