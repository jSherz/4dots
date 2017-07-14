import * as GameActions from '../actions/game';
import { Player, Players } from '../model';
import { Board } from '../model/Board';

const initialState = {
  currentPlayer: Players.PLAYER_A,
  // TODO: Init with a real game board
  gameBoard: Board.create(),
  gameStarted: false,
  players: {
    [Players.PLAYER_A]: new Player(''),
    [Players.PLAYER_B]: new Player('')
  }
};


// TODO: Add function to check if column is full

// TODO: Add function to check for win

// TODO: Tests!

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GameActions.START_GAME:
      return {
        ...state,
        gameStarted: true
      };

    case GameActions.RESET_GAME:
      return {
        ...state,
        currentPlayer: state.winner === Players.PLAYER_A ? Players.PLAYER_B : Players.PLAYER_A,
        gameBoard: Board.create(),
        winner: null
      };

    case GameActions.PLACE_PIECE:
      const column = action.payload;
      const { currentPlayer, gameBoard } = state;

      // Check there's room to place a piece here
      if (Board.lowestFreeSpace(gameBoard, column) !== null) {
        const nextPlayer = state.currentPlayer === Players.PLAYER_A ? Players.PLAYER_B : Players.PLAYER_A;
        const updatedBoard = Board.playPiece(gameBoard, action.payload, currentPlayer);
        const winner = Board.findWinner(updatedBoard);

        return {
          ...state,
          currentPlayer: nextPlayer,
          gameBoard: updatedBoard,
          winner
        };
      } else {
        return state;
      }

    case GameActions.UPDATE_PLAYER:
      const { player, name } = action.payload;

      return {
        ...state,
        players: {
          ...state.players,
          [player]: {
            name: name
          }
        }
      };

    default:
      return state
  }
};
