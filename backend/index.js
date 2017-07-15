'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Routes = require('./routes');
const Config = require('./util/config');
const Util = require('./util');

const GameService = require('./model/GameService');
const PlayerSchema = require('./model/PlayerSchema');
const GameSchema = require('./model/GameSchema');

const environment = process.env.NODE_ENV || 'dev';

const server = new Hapi.Server();
server.connection({ port: 8080, host: (environment === 'dev') ? 'localhost' : '0.0.0.0' });

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/4dots', { useMongoClient: true });

const Game = mongoose.model('Game', GameSchema);
const Player = mongoose.model('Player', PlayerSchema);

const service = new GameService(Player, Game);

server.route(Routes.getLeaderboard(service));
server.route(Routes.postSubmitScore(service));

server.register(Config.good, Util.throwOnErr('Failed to register Good'));

server.start((err) => {
  Util.throwOnErr('General failure while starting server')(err);

  console.log(`Server running at: ${server.info.uri}`);
  console.log(`Running environment: ${environment}`);
});
