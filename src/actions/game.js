export const RESET_GAME = 'RESET_GAME';
export const UPDATE_GAME_BOARD = 'UPDATE_GAME_BOARD';
export const PLACE_PIECE = 'PLACE_PIECE';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const START_GAME = 'START_GAME';
export const SUBMIT_SCORE = 'SUBMIT_SCORE';

export const resetGame = () => {
  return {
    type: RESET_GAME
  };
};

export const updateGameBoard = (gameBoard) => {
  return {
    type: UPDATE_GAME_BOARD,
    payload: gameBoard
  };
};

export const columnClicked = (column) => {
  return {
    type: PLACE_PIECE,
    payload: column
  };
};

export const updatePlayer = (player, name) => {
  return {
    type: UPDATE_PLAYER,
    payload: {
      player, name
    }
  }
};

export const startGame = () => {
  return {
    type: START_GAME
  }
};

export const submitScore = () => {
  return {
    type: SUBMIT_SCORE
  }
};
