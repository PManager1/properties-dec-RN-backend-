'use strict';

/**
 * Module dependencies
 */
var reifaxesPolicy = require('../policies/reifaxes.server.policy'),
  reifaxes = require('../controllers/reifaxes.server.controller');

module.exports = function(app) {
  // Reifaxes Routes
  app.route('/api/reifaxes').all(reifaxesPolicy.isAllowed)
    .get(reifaxes.list)
    .post(reifaxes.create);

  app.route('/api/reifaxes/:reifaxId').all(reifaxesPolicy.isAllowed)
    .get(reifaxes.read)
    .put(reifaxes.update)
    .delete(reifaxes.delete);

  // Finish by binding the Reifax middleware
  app.param('reifaxId', reifaxes.reifaxByID);
};
