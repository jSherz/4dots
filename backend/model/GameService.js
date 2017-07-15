class GameService {

  constructor(player, game) {
    this.player = player;
    this.game = game;
  }

  leaderboard(callback) {
    this.player
      .aggregate(
        { $unwind: '$games' },
        { $group: { _id: { id: '$_id', name: '$name' }, games: { $sum: 1 } } },
        { $sort: { games: -1 } },
        { $limit: 3 },
        { $project: { _id: false, id: '$_id._id', name: '$_id.name', num_wins: '$games' } }
      )
      .exec((error, result) => callback(result));
  }

  saveGame(name) {
    this.player.findOne({ name }, 'games')
      .then((person) => {
        if (!person) {
          person = new this.player({ name, games: [] });
        }

        person.games.push(new this.game());

        return person.save();
      });
  }

}

module.exports = GameService;
