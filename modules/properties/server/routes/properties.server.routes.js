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


  app.route('/api/Property/:newProperty').all(propertiesPolicy.isAllowed)
    .post(properties.createProperty);

  app.param('newProperty', properties.createProperty);



  app.route('/api/propertiesListByUser/:userId').all(propertiesPolicy.isAllowed)
    .get(properties.propertiesListByUser)
    .post(properties.create);


  app.route('/api/propertiesListByToday/:date').all(propertiesPolicy.isAllowed)
    .post(properties.propertiesListByToday); 
  app.param('date', properties.propertiesListByToday); 



  app.route('/api/propertiesSearchAPI/:Searchquery').all(propertiesPolicy.isAllowed)
    .get(properties.propertiesSearchAPI); 


  app.route('/api/singlePropertySearchAPI/:singlePropSearch_term').all(propertiesPolicy.isAllowed)
    .get(properties.singlePropertySearchAPI); 


  app.route('/api/Later_Today_P_prioritySearch/:Later_Today_P').all(propertiesPolicy.isAllowed)
    .get(properties.Later_Today_P_prioritySearch); 


  app.route('/api/queryPrioritySearch/:query_P').all(propertiesPolicy.isAllowed)
    .get(properties.queryPrioritySearch); 


  app.route('/api/FollowUpSearch/:followUp').all(propertiesPolicy.isAllowed)
    .get(properties.FollowUpSearch); 


  app.route('/api/properties/:propertyId').all(propertiesPolicy.isAllowed)
    .get(properties.read)
    .put(properties.update)
    .delete(properties.delete);



//  EMAIL 
  app.route('/api/sendEmail/:user').all(propertiesPolicy.isAllowed)
  .post(properties.sendEmail);



  app.route('/api/SvcEmail_SendMeDistressedListings/:distressListings').all(propertiesPolicy.isAllowed)
  .post(properties.sendEmailTemplate);


  app.route('/api/sendEmailTemplate/:etemplate').all(propertiesPolicy.isAllowed)
  .post(properties.sendEmailTemplate);


// COMPS 
  app.route('/api/grabCmpAPI/:propObj').all(propertiesPolicy.isAllowed)
  .post(properties.sendEmailTemplate);


  // app.route('/api/forgoto').all(propertiesPolicy.isAllowed)
  // .post(properties.forgoto);




  // Finish by binding the Property middleware
  app.param('propertyId', properties.propertyByID);

  app.param('userId', properties.propertiesListByUser);   
  app.param('Searchquery', properties.propertiesSearchAPI);  
  app.param('singlePropSearch_term', properties.singlePropertySearchAPI);    
  app.param('Later_Today_P', properties.Later_Today_P_prioritySearch); 
  app.param('query_P', properties.queryPrioritySearch);  
  app.param('followUp', properties.FollowUpSearch);  
//  EMAIL   
  app.param('user', properties.sendEmail);  
  app.param('distressListings', properties.SvcEmail_SendMeDistressedListings);  
  app.param('etemplate', properties.sendEmailTemplate); 
// Comps
  app.param('propObj', properties.grabCmpAPI);  


};











