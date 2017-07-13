import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './GamePiece.css';
import lemon from './images/lemon.png';
import watermelon from './images/watermelon.png';
import { Players } from '../../model';

export class GamePiece extends Component {

  static propTypes = {
    column: PropTypes.number.isRequired,
    onColumnClicked: PropTypes.func.isRequired,
    player: PropTypes.oneOf([...Players.VALID_PLAYERS, Players.PLAYER_NONE]),
    row: PropTypes.number.isRequired,
    topPiece: PropTypes.bool.isRequired
  };

  renderPlayerImage() {
    const { player } = this.props;

    if (player === Players.PLAYER_A) {
      return <img src={lemon} alt="Player A" className="GamePieceLemon"/>
    } else if (player === Players.PLAYER_B) {
      return <img src={watermelon} alt="Player B" className="GamePieceWatermelon"/>
    } else {
      return null;
    }
  }

  render() {
    const { column, onColumnClicked, row, topPiece } = this.props;

    let extraClasses = '';

    if (topPiece) {
      extraClasses = 'GamePieceTop';
    }

    return (
      <div
        className={`GamePiece ${extraClasses}`}
        id={`piece_${column}_${row}`}
        onClick={() => onColumnClicked(column)}
      >
        {this.renderPlayerImage()}
      </div>
    );
  }

}

export default GamePiece;
