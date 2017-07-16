const getLeaderboard = (service) => {
  return {
    config: {
      cors: true,
    },
    method: 'GET',
    path: '/leaderboard',
    handler: function (request, reply) {
      service.leaderboard(reply);
    }
  };
};

module.exports = getLeaderboard;
