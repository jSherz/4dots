const getLeaderboard = (service) => {
  return {
    method: 'GET',
    path: '/leaderboard',
    handler: function (request, reply) {
      service.leaderboard(reply);
    }
  };
};

module.exports = getLeaderboard;
