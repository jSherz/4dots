import { PLAYER_A, PLAYER_B } from '../reducers/game';

export class Players {

  [PLAYER_A];
  [PLAYER_B];

  constructor(playerA, playerB) {
    this[ PLAYER_A ] = playerA;
    this[ PLAYER_B ] = playerB;
  }

}
