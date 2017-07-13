import PropTypes from 'prop-types';

import Player from './Player';

export class Players {

  static PLAYER_A = 'PLAYER_A';
  static PLAYER_B = 'PLAYER_B';
  static PLAYER_NONE = 'PLAYER_NONE';
  static VALID_PLAYERS = [ Players.PLAYER_A, Players.PLAYER_B ];

  static propTypes = {
    [Players.PLAYER_A]: PropTypes.shape(Player.propTypes).isRequired,
    [Players.PLAYER_B]: PropTypes.shape(Player.propTypes).isRequired,
  };

  [Players.PLAYER_A];
  [Players.PLAYER_B];

  constructor(playerA, playerB) {
    this[ Players.PLAYER_A ] = playerA;
    this[ Players.PLAYER_B ] = playerB;
  }

}

export default Players;
