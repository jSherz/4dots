const Schema = require('mongoose').Schema;

const GameSchema = new Schema({
  date: { type: Date, default: Date.now }
});

module.exports = GameSchema;
