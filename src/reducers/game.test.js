import { gameReducer } from './game';
import {
  columnClicked,
  hideLeaderboard,
  resetGame,
  showLeaderboard,
  startGame,
  updateLeaderboard,
  updatePlayer
} from '../actions/game';
import { Board, Leaderboard, Player, Players } from '../model';
import { makeBoard } from '../model/Board.test';

describe('reducers/game', () => {

  it('starts with a blank board, two blank players and player A goes first', () => {
    const result = gameReducer(undefined, { type: 'foo-bar-wrong' });

    expect(result.currentPlayer).toEqual(Players.PLAYER_A);
    expect(result.gameBoard).toEqual(Board.create());
    expect(result.gameStarted).toEqual(false);
    expect(result.players[Players.PLAYER_A].name).toEqual('');
    expect(result.players[Players.PLAYER_B].name).toEqual('');
    expect(result.showLeaderboard).toEqual(false);
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

  describe('when it receives SHOW_LEADERBOARD', () => {

    it('updates the leaderboard', () => {
      const state = {
        currentPlayer: Players.PLAYER_A,
        gameBoard: Board.create(),
        gameStarted: false,
        players: {
          [Players.PLAYER_A]: new Player('Nicole'),
          [Players.PLAYER_B]: new Player('Nicola')
        },
        showLeaderboard: true
      };

      // We return a value rather than use a promise here as we're not wiring up the redux-promise middleware here
      const dummyHttpClient = {
        get() {
          const leaderboard = [
            {
              name: 'Bob',
              num_wins: 4
            },
            {
              name: 'Bob 2',
              num_wins: 3
            },
            {
              name: 'B0b',
              num_wins: 1
            }
          ];

          return { data: leaderboard };
        }
      };

      const result = gameReducer(state, showLeaderboard(dummyHttpClient));

      // We translate the incoming JSON into our variable naming style here
      expect(result.leaderboard).toEqual(new Leaderboard([
        {
          name: 'Bob',
          numWins: 4
        },
        {
          name: 'Bob 2',
          numWins: 3
        },
        {
          name: 'B0b',
          numWins: 1
        }
      ]));

      expect(result.showLeaderboard).toEqual(true);
    });

    it('does not update the leaderboard if the request fails', () => {
      const state = {
        currentPlayer: Players.PLAYER_A,
        gameBoard: Board.create(),
        gameStarted: false,
        players: {
          [Players.PLAYER_A]: new Player('Barbara'),
          [Players.PLAYER_B]: new Player('Barbaric')
        },
        showLeaderboard: false
      };

      // We return a value rather than use a promise here as we're not wiring up the redux-promise middleware here
      const dummyHttpClient = {
        get() {
          return { status: 500 };
        }
      };

      const result = gameReducer(state, showLeaderboard(dummyHttpClient));

      expect(result.leaderboard).toEqual(undefined);
      expect(result.showLeaderboard).toEqual(false);
    });

  });

  describe('when it receives HIDE_LEADERBOARD', () => {

    it('hides the leaderboard', () => {
      const state = {
        currentPlayer: Players.PLAYER_A,
        gameBoard: Board.create(),
        gameStarted: false,
        players: {
          [Players.PLAYER_A]: new Player('Nicole'),
          [Players.PLAYER_B]: new Player('Nicola')
        },
        showLeaderboard: true
      };

      const result = gameReducer(state, hideLeaderboard());

      expect(result.showLeaderboard).toEqual(false);
    });

  });

});
