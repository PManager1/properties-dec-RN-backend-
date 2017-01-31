'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Property = mongoose.model('Property'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  config = require(path.resolve('./config/config')),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  nodemailer = require('nodemailer'),
  async = require('async'),
  crypto = require('crypto');

var smtpTransport = nodemailer.createTransport(config.mailer.options);



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
console.log( '192- PSC  id = ', id); 
console.log( ' queryPrioritySearch query_P  req.params  = ', req.params); 


var id_2  = id; 
var dynamicId={};
dynamicId[id_2]=true;


Property.find(dynamicId).exec(function(err, properties) { 

// Property.find(Left_VM_P).exec(function(err, properties) {  //works
// Property.find({ Left_VM_P : true }).exec(function(err, properties) {  //works

  // Property.find( { $where: "this.Left_VM_P == true" } ).exec(function(err, properties) {     

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

// console.log('222- FollowUpSearch-API  id = ', id);
// var today = new Date(); 

 var oldDate = new Date();
  var preDate =  oldDate.setDate(oldDate.getDate() - 1); 
// console.log( '227- preDate =', preDate); 


 var newDate = new Date();
  var nextDate =  newDate.setDate(newDate.getDate() + 1); 
// console.log( '227- nextDate =', nextDate); 

// console.log('227- psc --  today date  = ', today); 

   Property.find({ "FollowUp_Call_Date": {"$gte": preDate, "$lt": nextDate }}).exec(function(err, properties) {  
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


/*
  var transporter = nodemailer.createTransport('smtps://libertytrustgroupllc@gmail.com:sharejim@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
    to: 'jpca999@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

}

*/

  // console.log( 'calling sendEmail & id = ', id); 

        async.waterfall([
            myFirstFunction,
            mySecondFunction,
            myLastFunction,
        ], function (err, result) {
            // result now equals 'done'
        });

        function myFirstFunction(callback) {
                              console.log( ' myFirstFunction'); 

             Property.find({"address" : {$regex : '.*'+id+'*'}}).exec(function(err, properties) {  
             // Property.find({"address" : {$regex : "asfd"}}).exec(function(err, properties) {                
                if (err) {
                  // console.log(err);
                  return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                  });
                } else {
                  // console.log('properties = ', properties);
                  // res.jsonp(properties);
                  
                  callback(null, properties, 'two');  
                }
              });                  

            
        }
        function mySecondFunction(properties, arg2, callback) {
            // arg1 now equals 'one' and arg2 now equals 'two'
          console.log( ' my-2-Function properties.agent_name =', properties[0].email_address);     
          // console.log( ' my-2-Function arg2 =', arg2);      
    
          // console.log('282- psc --- mySecondFunction  properties = ', properties); 
          var httpTransport = 'http://';
          if (config.secure && config.secure.ssl === true) {
              httpTransport = 'https://';
          }
          var baseUrl = req.app.get('domain') || httpTransport + req.headers.host;
          
          // console.log( '288-psc  baseUrl = ', baseUrl); 

          res.render(path.resolve('modules/users/server/templates/statusOfProperty'), {
              // name: properties[0].agent_name,
              name: properties[0].agent_name,              
              appName: properties[0].agent_name,
              address: properties[0].address, 
              city: properties[0].city,
              url: 'baseUrl'
          }, function(err, emailHTML) {
                 if (err) {
                     // console.log(err);
                     return res.status(400).send({
                         message: errorHandler.getErrorMessage(err)
                     });
                 } else {

                     // console.log('emailHTML = ', emailHTML);
                     // res.jsonp(properties);
                      callback(null, emailHTML, properties);
                 }
          });
        }

        function myLastFunction(emailHTML, properties, callback) {
console.log( '347 - myLastFunction '); 
      var mailOptions = {
        to: properties[0].email_address,  // REPLACE IT WITH THE  properties[0].email_address
        // to: 'jpca999@gmail.com',  // REPLACE IT WITH THE  properties[0].email_address
        from: config.mailer.from,
        subject: 'still available ?'+properties[0].address+'  '+properties[0].city,
        address: properties[0].address,        
        html: emailHTML
      };
      smtpTransport.sendMail(mailOptions, function (err) {

        if (!err) {
          console.log( ' 359- psc   = inside smtp Transport - i.e no error'); 
        // return res.send();
       return   res.send({
            message: 'An email has been sent to the provided email with further instructions.'
          });

        } else {
          console.log( ' 366- psc   = inside Else with  ERR',err);           
          return res.status(400).send({
            message: 'Failure sending email'
          });
        }

        done(err);
      });
            callback(null, 'done');
            // callback(err, 'done');
        }
}
















