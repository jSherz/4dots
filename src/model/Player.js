import PropTypes from 'prop-types';

export class Player {

  static propTypes = {
    name: PropTypes.string.isRequired
  };

  name;

  constructor(name) {
    this.name = name;
  }

}

export default Player;
