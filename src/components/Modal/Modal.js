import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

export class Modal extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div className="modal-wrapper">
        <div className="modal">
          {children}
        </div>
      </div>
    );
  }

}

export default Modal;
