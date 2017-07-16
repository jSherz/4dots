import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../components/Modal';
import { Player } from '../../model';
import './WinModal.css';

export class WinModal extends Component {

  static propTypes = {
    submitScore: PropTypes.func.isRequired,
    winner: PropTypes.shape(Player.propTypes).isRequired
  };

  render() {
    const { submitScore, winner } = this.props;

    return (
      <Modal>
        <div id="win-modal">
          <p>Congratulations, <strong>{winner.name}</strong> - you win!</p>

          <p id="win-modal-controls">
            <button onClick={() => submitScore(winner.name)}>Submit score</button>
          </p>
        </div>
      </Modal>
    );
  }

}

export default WinModal;
