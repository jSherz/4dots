module.exports = () => {
  const mongoose = require('mongoose');

  const Promise = require('bluebird');
  mongoose.Promise = Promise;

  const PlayerSchema = require('../../model/PlayerSchema');
  const GameSchema = require('../../model/GameSchema');

  mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/4dots', { useMongoClient: true });

  const Game = mongoose.model('Game', GameSchema);
  const Player = mongoose.model('Player', PlayerSchema);

  const createJim = new Player({ name: 'Jim' }).save();

  const createCharlie = new Player({
    name: 'Charlie', games: [
      new Game(), new Game(), new Game(), new Game()
    ]
  }).save();

  const createLiam = new Player({
    name: 'Liam', games: [
      new Game(), new Game(), new Game()
    ]
  }).save();

  const createRosie = new Player({
    name: 'Rosie', games: [
      new Game(), new Game()
    ]
  }).save();

  return Promise.all([
    createJim,
    createCharlie,
    createLiam,
    createRosie
  ]);
};
