'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Property = mongoose.model('Property'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');






/**
 * Create a Property
 */
exports.create = function(req, res) {
  var property = new Property(req.body);
  property.user = req.user;

  property.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(property);
    }
  });
};

/**
 * Show the current Property
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var property = req.property ? req.property.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  property.isCurrentUserOwner = req.user && property.user && property.user._id.toString() === req.user._id.toString();

  res.jsonp(property);
};

/**
 * Update a Property
 */
exports.update = function(req, res) {
  var property = req.property;

  property = _.extend(property, req.body);

  property.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(property);
    }
  });
};

/**
 * Delete an Property
 */
exports.delete = function(req, res) {
  var property = req.property;

  property.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(property);
    }
  });
};

/**
 * List of Properties
 */
exports.list = function(req, res) {
  Property.find().sort('-created').populate('user', 'displayName').exec(function(err, properties) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(properties);
    }
  });
};



exports.propertiesListByUser = function(req, res, next, id) {
  Property.find({user_logged_in: id }).sort('-created').populate('user', 'displayName').exec(function(err, properties) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(properties);
    }
  });
};

/**
 * Property middleware
 */
exports.propertyByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Property is invalid'
    });
  }

  Property.findById(id).populate('user', 'displayName').exec(function (err, property) {
    if (err) {
      return next(err);
    } else if (!property) {
      return res.status(404).send({
        message: 'No Property with that identifier has been found'
      });
    }
    req.property = property;
    next();
  });
};


// .populate('user', 'displayName')
// Property.find({ next_call_Date: {$regex : id}}).exec(function(err, properties) {
  // Property.find({user_logged_in: id }).sort('-created').populate('user', 'displayName').exec(function(err, properties) {
exports.propertiesListByToday = function(req, res, next, id) {
  Property.find({ last_date_email_sent_on : id }).exec(function(err, properties) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(properties);
    }
  });
};



exports.propertiesSearchAPI = function(req, res, next, id) {
  Property.find({ last_date_email_sent_on : id }).exec(function(err, properties) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(properties);
    }
  });
};


exports.Later_Today_P_prioritySearch = function(req, res, next, id) {  
  Property.find({ Later_Today_P : 'true' }).exec(function(err, properties) {  

    if (err) {
      // console.log( ' err =', err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log( ' properties =', properties);      
      res.jsonp(properties);
    }
  });
};



exports.queryPrioritySearch = function(req, res, next, id) { 

console.log( '  id = ', id); 
// console.log( '  query_P = ', query_P); 
console.log( ' queryPrioritySearch query_P  req.params  = ', req.params); 
  

  Property.find({ "Left_VM_P" : ob.t }).exec(function(err, properties) {  //works

  // Property.find( { $where: "this.Left_VM_P == true" } ).exec(function(err, properties) {   
  // Property.find({ id : true }).exec(function(err, properties) {              

    if (err) {   
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else { 
      res.jsonp(properties);
    }
  });
};



exports.FollowUpSearch = function(req, res, next, id) {

// console.log( 'FollowUpSearch-API  id = ', id); 
// console.log( ' FollowUpSearch-API  req.params  = ', req.params); 
// works
// Property.find({ "FollowUp_Call_Date": {"$gte": new Date(2017, 0, 27) }}).exec(function(err, properties) {
var today = new Date(); 

   Property.find({ "FollowUp_Call_Date": {"$gte": today }}).exec(function(err, properties) {  
    if (err) {
      // console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log('FollowUp Date properties = ', properties);
      res.jsonp(properties);
    }
  });
};



exports.sendEmail = function(req, res, next, id) {

  console.log( '  id = ', id); 
  // console.log('res.data', res.data); 

  // Property.find({user_logged_in: id }).sort('-created').populate('user', 'displayName').exec(function(err, properties) {
  
  // Property.findById(id).populate('user', 'displayName').exec(function (err, property) {
  Property.find({ _id : id }).exec(function(err, properties) {      

    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log( ' prop =', properties);

//  From here on send the email via Node MAiler. 

      res.jsonp(properties);
    }
  });
};













