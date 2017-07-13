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
        gameBoard: Board.create()
      };

    // case GameActions.UPDATE_GAME_BOARD:
    //   const nextPlayer = state.currentPlayer === PLAYER_A ? PLAYER_B : PLAYER_A;
    //
    //   return {
    //     ...state,
    //     currentPlayer: nextPlayer,
    //     gameBoard: action.payload
    //   };

    case GameActions.PLACE_PIECE:
      const nextPlayer = state.currentPlayer === Players.PLAYER_A ? Players.PLAYER_B : Players.PLAYER_A;
      const { currentPlayer, gameBoard } = state;

      return {
        ...state,
        currentPlayer: nextPlayer,
        gameBoard: Board.playPiece(gameBoard, action.payload, currentPlayer)
      };

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
