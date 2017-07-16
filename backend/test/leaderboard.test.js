const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = require('code').expect;

const server = require('../index');

lab.experiment('GET /leaderboard', () => {

  lab.test('returns an empty array when no players have submitted scores', (done) => {
    const empty = require('./fixtures/empty');
    empty().then(() => {
      const options = { method: 'GET', url: '/leaderboard' };

      server.inject(options, (response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.equal([]);

        done();
      });
    });
  });

  lab.test('returns the three highest scoring players', (done) => {
    const example = require('./fixtures/example');
    example().then(() => {
      const options = { method: 'GET', url: '/leaderboard' };

      server.inject(options, (response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.equal([
          {
            name: 'Charlie',
            num_wins: 4
          },
          {
            name: 'Liam',
            num_wins: 3
          },
          {
            name: 'Rosie',
            num_wins: 2
          }
        ]);

        done();
      });
    });
  });

});
