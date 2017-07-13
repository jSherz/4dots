import * as GameActions from '../actions/game';
import { Player } from '../model/Player';

export const PLAYER_A = 'PLAYER_A';
export const PLAYER_B = 'PLAYER_B';
export const PLAYER_NONE = 'PLAYER_NONE';

const initialState = {
  currentPlayer: PLAYER_A,
  // TODO: Init with a real game board
  gameBoard: {},
  gameStarted: false,
  players: {
    [PLAYER_A]: new Player(''),
    [PLAYER_B]: new Player('')
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
        gameBoard: {}
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
      const nextPlayer = state.currentPlayer === PLAYER_A ? PLAYER_B : PLAYER_A;

      return {
        ...state,
        currentPlayer: nextPlayer
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
