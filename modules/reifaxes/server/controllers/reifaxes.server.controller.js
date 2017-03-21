'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Property = mongoose.model('Property'),  
  Reifax = mongoose.model('Reifax'),
  
  Article = mongoose.model('Article'),

  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');


/**
 * List of Reifaxes
 */
exports.list = function(req, res) {
  // console.log('85-RSC--calling in reifax list  Reifax=', Reifax); 

 // Property.find().sort('-created').populate('user', 'displayName').exec(function(err,  reifaxes) {
  // User.find().sort('-created').populate('user', 'displayName').exec(function(err,  reifaxes) {
  
  Article.find().populate('Reifax').exec(function(err, reifaxes) {
  // Reifax.find().populate('Reifax').exec(function(err, reifaxes) {
    if (err) {
      console.log( '90- error here');
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log( ' reifaxes  = ', reifaxes);
      res.jsonp(reifaxes);
    }
  });
};

//   var id = "Brian";

//   Reifax.findOne({ agent_name : id }).exec(function(err, properties) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       ÷//       console.log( ' reifaxes  = ', reifaxes);
//       res.jsonp(properties);
//     }
//   });
// };



//   Reifax.find().sort('-created').populate('user', 'displayName').exec(function(err,  reifaxes) {
//   // Reifax.find().populate('Reifax').exec(function(err, reifaxes) {
//     if (err) {
//       console.log( '90- error here');
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       console.log( ' reifaxes  = ', reifaxes);
//       res.jsonp(reifaxes);
//     }
//   });
// };


// console.log('95-RSC--calling in reifax list function'); 

//   Property.find().sort('-created').populate('user', 'displayName').exec(function(err, properties) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.jsonp(properties);
//     }
//   });
// };







/**
 * Create a Reifax
 */
exports.create = function(req, res) {
  var reifax = new Reifax(req.body);
  reifax.user = req.user;

  reifax.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reifax);
    }
  });
};

/**
 * Show the current Reifax
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var reifax = req.reifax ? req.reifax.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  reifax.isCurrentUserOwner = req.user && reifax.user && reifax.user._id.toString() === req.user._id.toString();

  res.jsonp(reifax);
};

/**
 * Update a Reifax
 */
exports.update = function(req, res) {
  var reifax = req.reifax;

  reifax = _.extend(reifax, req.body);

  reifax.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reifax);
    }
  });
};

/**
 * Delete an Reifax
 */
exports.delete = function(req, res) {
  var reifax = req.reifax;

  reifax.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reifax);
    }
  });
};




/**
 * Reifax middleware
 */
exports.reifaxByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Reifax is invalid'
    });
  }

  Reifax.findById(id).populate('user', 'displayName').exec(function (err, reifax) {
    if (err) {
      return next(err);
    } else if (!reifax) {
      return res.status(404).send({
        message: 'No Reifax with that identifier has been found'
      });
    }
    req.reifax = reifax;
    next();
  });
};
