'use strict';

/**
 * Module dependencies
 */
var propertiesPolicy = require('../policies/properties.server.policy'),
  properties = require('../controllers/properties.server.controller');

module.exports = function(app) {
  // Properties Routes
  app.route('/api/properties').all(propertiesPolicy.isAllowed)
    .get(properties.list)
    .post(properties.create);
  // Properties Routes
 
  // app.route('/api/propertiesListByUser').all(propertiesPolicy.isAllowed)
  //   .get(properties.propertiesListByUser)
  //   .post(properties.create);


  app.route('/api/propertiesListByUser/:userId').all(propertiesPolicy.isAllowed)
    .get(properties.propertiesListByUser)
    .post(properties.create);


  app.route('/api/propertiesListByToday/:date').all(propertiesPolicy.isAllowed)
    .get(properties.propertiesListByToday); 


  app.route('/api/propertiesSearchAPI/:Search_term').all(propertiesPolicy.isAllowed)
    .get(properties.propertiesSearchAPI); 

  app.route('/api/Later_Today_P_prioritySearch/:Later_Today_P').all(propertiesPolicy.isAllowed)
    .get(properties.Later_Today_P_prioritySearch); 


  app.route('/api/FollowUpSearch/:follUp').all(propertiesPolicy.isAllowed)
    .get(properties.FollowUpSearch); 


  app.route('/api/properties/:propertyId').all(propertiesPolicy.isAllowed)
    .get(properties.read)
    .put(properties.update)
    .delete(properties.delete);

  // Finish by binding the Property middleware
  app.param('propertyId', properties.propertyByID);
  app.param('userId', properties.propertiesListByUser);  
  app.param('date', properties.propertiesListByToday);  
  app.param('Search_term', properties.propertiesSearchAPI);  
  app.param('Later_Today_P', properties.Later_Today_P_prioritySearch); 

  app.param('follUp', properties.FollowUpSearch);  
  

};
