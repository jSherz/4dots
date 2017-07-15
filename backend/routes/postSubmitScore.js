const Joi = require('joi');

const postSubmitScore = (service) => {
  return {
    method: 'POST',
    path: '/submit-win',
    config: {
      validate: {
        payload: {
          name: Joi.string().min(3).max(100).required()
        }
      }
    },
    handler: function (request, reply) {
      service.saveGame(request.payload.name);

      reply({ statusCode: 200, saved: true });
    }
  };
};

module.exports = postSubmitScore;
