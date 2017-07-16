module.exports = () => {
  const mongoose = require('mongoose');

  mongoose.Promise = require('bluebird');

  const PlayerSchema = require('../../model/PlayerSchema');
  const GameSchema = require('../../model/GameSchema');

  mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/4dots', { useMongoClient: true });

  const Game = mongoose.model('Game', GameSchema);
  const Player = mongoose.model('Player', PlayerSchema);

  return Player.remove();
};
