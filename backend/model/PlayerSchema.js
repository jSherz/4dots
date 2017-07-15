const Schema = require('mongoose').Schema;
const GameSchema = require('./GameSchema');

const PlayerSchema = new Schema({
  name: String,
  games: [GameSchema]
});

module.exports = PlayerSchema;
