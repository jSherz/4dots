const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = require('code').expect;

const server = require('../index');

lab.experiment('POST /submit-win', () => {

  lab.test('saves a new player\'s win', (done) => {
    const empty = require('./fixtures/empty');
    empty().then(() => {
      const options = {
        method: 'POST',
        url: '/submit-win',
        payload: JSON.stringify({ name: 'Bradley' })
      };

      server.inject(options, (response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.equal({ statusCode: 200, saved: true });

        // TODO: Workaround this nasty setTimeout hack
        setTimeout(() => {
          const verifyOptions = { method: 'GET', url: '/leaderboard' };

          server.inject(verifyOptions, (verifyResponse) => {
            expect(verifyResponse.statusCode).to.equal(200);
            expect(verifyResponse.result).to.equal([
              {
                name: 'Bradley',
                num_wins: 1
              }
            ]);

            done();
          });
        }, 1000);
      });
    });
  });

  lab.test('saves an existing player\'s win', (done) => {
    const example = require('./fixtures/example');
    example().then(() => {
      const options = {
        method: 'POST',
        url: '/submit-win',
        payload: JSON.stringify({ name: 'Charlie' })
      };

      server.inject(options, (response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.equal({ statusCode: 200, saved: true });

        // TODO: Workaround this nasty setTimeout hack
        setTimeout(() => {
          const verifyOptions = { method: 'GET', url: '/leaderboard' };

          server.inject(verifyOptions, (verifyResponse) => {
            expect(verifyResponse.statusCode).to.equal(200);
            expect(verifyResponse.result).to.equal([
              {
                name: 'Charlie',
                num_wins: 5
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
        }, 1000);
      });
    });
  });

  lab.test('rejects a request with no name', (done) => {
    const options = {
      method: 'POST',
      url: '/submit-win',
      payload: JSON.stringify({})
    };

    server.inject(options, (response) => {
      expect(response.statusCode).to.equal(400);
      expect(response.result).to.equal({
        error: 'Bad Request',
        message: 'child "name" fails because ["name" is required]',
        statusCode: 400,
        validation: {
          keys: [
            'name'
          ],
          source: 'payload'
        }
      });

      done();
    });
  });

});
