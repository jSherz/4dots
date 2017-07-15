import { gameReducer } from './game';
import { columnClicked, resetGame, startGame, updatePlayer } from '../actions/game';
import { Board, Player, Players } from '../model';
import { makeBoard } from '../model/Board.test';

describe('reducers/game', () => {

  it('starts with a blank board, two blank players and player A goes first', () => {
    const result = gameReducer(undefined, { type: 'foo-bar-wrong' });

    expect(result.currentPlayer).toEqual(Players.PLAYER_A);
    expect(result.gameBoard).toEqual(Board.create());
    expect(result.gameStarted).toEqual(false);
    expect(result.players[Players.PLAYER_A].name).toEqual('');
    expect(result.players[Players.PLAYER_B].name).toEqual('');
  });

  describe('when it receives START_GAME', () => {

    it('starts the game', () => {
      const state = {
        currentPlayer: Players.PLAYER_A,
        gameBoard: Board.create(),
        gameStarted: false,
        players: {
          [Players.PLAYER_A]: new Player('Judie'),
          [Players.PLAYER_B]: new Player('Robin')
        }
      };

      const result = gameReducer(state, startGame());
      const expectedState = { ...state, gameStarted: true };

      expect(result).toEqual(expectedState);
    });

  });

  describe('when it receives RESET_GAME', () => {

    it('clears the board and players', () => {
      const state = {
        currentPlayer: Players.PLAYER_B,
        gameBoard: makeBoard(
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ A A _ _ _' +
          '_ _ A B A _ _' +
          '_ _ A B B B B'
        ),
        gameStarted: true,
        players: {
          [Players.PLAYER_A]: new Player('Charlie'),
          [Players.PLAYER_B]: new Player('Joseph')
        },
        winner: Players.PLAYER_B
      };

      const result = gameReducer(state, resetGame());

      expect(result.currentPlayer).toEqual(Players.PLAYER_A);
      expect(result.gameBoard).toEqual(Board.create());
      expect(result.gameStarted).toEqual(false);
      expect(result.players[Players.PLAYER_A].name).toEqual('');
      expect(result.players[Players.PLAYER_B].name).toEqual('');
      expect(result.winner).toBeUndefined();
    });

  });

  describe('when it received PLACE_PIECE', () => {

    it('does not change the player or place a piece if the column is full', () => {
      const state = {
        currentPlayer: Players.PLAYER_A,
        gameBoard: makeBoard(
          '_ _ B _ _ _ _' +
          '_ _ A _ _ _ _' +
          '_ _ B _ _ _ _' +
          '_ _ A _ _ _ _' +
          '_ _ B _ _ _ _' +
          '_ _ A _ _ _ _'
        ),
        gameStarted: true,
        players: {
          [Players.PLAYER_A]: new Player('Jake'),
          [Players.PLAYER_B]: new Player('Jeffrey')
        }
      };

      const result = gameReducer(state, columnClicked(2));

      expect(result.currentPlayer).toEqual(state.currentPlayer);
      expect(result.gameBoard).toEqual(state.gameBoard);
    });

    it('plays the piece in the correct column and changes the player', () => {
      const state = {
        currentPlayer: Players.PLAYER_A,
        gameBoard: makeBoard(
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ B A B _ _' +
          '_ _ A B A _ _'
        ),
        gameStarted: true,
        players: {
          [Players.PLAYER_A]: new Player('Lucilla'),
          [Players.PLAYER_B]: new Player('Emily')
        }
      };

      const result = gameReducer(state, columnClicked(3));

      expect(result.currentPlayer).toEqual(Players.PLAYER_B);
      expect(result.gameBoard).toEqual(makeBoard(
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ _ _ _ _' +
        '_ _ _ A _ _ _' +
        '_ _ B A B _ _' +
        '_ _ A B A _ _'
      ));
    });

    it('sets the winner if one was found', () => {
      const state = {
        currentPlayer: Players.PLAYER_A,
        gameBoard: makeBoard(
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ _ _ _ _ _ _' +
          '_ A B _ _ _ _' +
          '_ A B _ _ _ _' +
          '_ A B _ _ _ _'
        ),
        gameStarted: true,
        players: {
          [Players.PLAYER_A]: new Player('BoatyMcBoatFace'),
          [Players.PLAYER_B]: new Player('Ricardo')
        }
      };

      const result = gameReducer(state, columnClicked(1));

      expect(result.currentPlayer).toEqual(Players.PLAYER_B);
      expect(result.winner).toEqual(Players.PLAYER_A);
    });

  });

  describe('when it receives UPDATE_PLAYER', () => {

    it('updates the relevant player\'s name', () => {
      const state = {
        currentPlayer: Players.PLAYER_A,
        gameBoard: Board.create(),
        gameStarted: false,
        players: {
          [Players.PLAYER_A]: new Player(''),
          [Players.PLAYER_B]: new Player('')
        }
      };

      const resultA = gameReducer(state, updatePlayer(Players.PLAYER_A, 'Brian'));
      expect(resultA.players[Players.PLAYER_A].name).toEqual('Brian');

      const resultB = gameReducer(state, updatePlayer(Players.PLAYER_B, 'Watermelon'));
      expect(resultB.players[Players.PLAYER_B].name).toEqual('Watermelon');
    });

  });

});
