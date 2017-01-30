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
  // console.log( '149- psc = propertiesListByToday  id =', id); 
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


// <<<<<<< HEAD
// exports.Later_Today_P_prioritySearch = function(req, res, next, id) {  
//   Property.find({ Later_Today_P : 'true' }).exec(function(err, properties) {  

//     if (err) {
// =======
exports.Later_Today_P_prioritySearch = function(req, res, next, id) {
console.log( ' 175-psc - callign Later_Today_P  = '); 
  Property.find({ Later_Today_P : 'true' }).exec(function(err, properties) {  

    if (err) {
      // console.log( ' err =', err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(properties);
    }
  });
};



// <<<<<<< HEAD
// exports.queryPrioritySearch = function(req, res, next, id) {  
//   Property.find({ Later_Today_P : 'true' }).exec(function(err, properties) {  

// =======
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

// console.log( 'FollowUpSearch-API  id = ', id); 
// console.log( ' FollowUpSearch-API  req.params  = ', req.params); 
// works
// Property.find({ "FollowUp_Call_Date": {"$gte": new Date(2017, 0, 27) }}).exec(function(err, properties) {
var today = new Date(); 
console.log( '223- FollowUpSearch =  today date = ', today); 

   Property.find({ "FollowUp_Call_Date": {"$gte": today }}).exec(function(err, properties) {  
    
   // Property.find({ "FollowUp_Call_Date": {"$eq": today }}).exec(function(err, properties) {  
// >>>>>>> SendBlue-Email-3
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



// <<<<<<< HEAD
// exports.FollowUpSearch = function(req, res, next, id) {

// console.log( 'FollowUpSearch-API  id = ', id); 
// console.log( ' FollowUpSearch-API  req.params  = ', req.params); 
// // works
// // Property.find({ "FollowUp_Call_Date": {"$gte": new Date(2017, 0, 27) }}).exec(function(err, properties) {
// var today = new Date(); 

//    Property.find({ "FollowUp_Call_Date": {"$gte": today }}).exec(function(err, properties) {  
//     if (err) {
//       console.log(err);
// =======


exports.sendEmail = function(req, res, next, id) {
  console.log( 'calling sendEmail & id = ', id); 



        async.waterfall([
            myFirstFunction,
            mySecondFunction,
            myLastFunction,
        ], function (err, result) {
            // result now equals 'done'
        });

        function myFirstFunction(callback) {
                              console.log( ' myFirstFunction'); 

             Property.find({"address" : {$regex : ".*1721 SW 116TH WAY*"}}).exec(function(err, properties) {  
                if (err) {
                  // console.log(err);
                  return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                  });
                } else {
                  console.log('properties = ', properties);
                  // res.jsonp(properties);

                  callback(null, properties, 'two');  
                }
              });                  


            
        }
        function mySecondFunction(properties, arg2, callback) {
            // arg1 now equals 'one' and arg2 now equals 'two'
          // console.log( ' my-2-Function properties.agent_name =', properties[0].email_address);     
          // console.log( ' my-2-Function arg2 =', arg2);      
    

          var httpTransport = 'http://';
          if (config.secure && config.secure.ssl === true) {
              httpTransport = 'https://';
          }
          var baseUrl = req.app.get('domain') || httpTransport + req.headers.host;
          
          console.log( '288-psc  baseUrl = ', baseUrl); 

          res.render(path.resolve('modules/users/server/templates/statusOfProperty'), {
              name: properties[0].agent_name,
              appName: "some Project Title",
              url: 'baseUrl'
          }, function(err, emailHTML) {
                 if (err) {
                     // console.log(err);
                     return res.status(400).send({
                         message: errorHandler.getErrorMessage(err)
                     });
                 } else {

                     console.log('304---emailHTML = ', emailHTML);
                     // res.jsonp(properties);
                      callback(null, emailHTML, properties);
                 }


          });



        }

        function myLastFunction(emailHTML, properties, callback) {
            // arg1 now equals 'three'
      console.log( ' 318- myLastFunction emailHTML =', emailHTML);
                              // console.log( ' my-3- Function properties =', properties);

// LAter you can look over the array here properties[i].email_address

      var mailOptions = {
        to: 'jpca999@gmail.com',  // REPLACE IT WITH THE  properties[0].email_address
        from: config.mailer.from,
        subject: 'Password Reset',
        html: emailHTML
      };
      smtpTransport.sendMail(mailOptions, function (err) {

        if (!err) {
          console.log( ' 328- psc   = inside smtp Transport '); 

        // return res.send();

       return   res.send({
            message: 'An email has been sent to the provided email with further instructions.'
          });


        } else {
          return res.status(400).send({
            message: 'Failure sending email'
          });
        }

        done(err);
      });





            callback(null, 'done');
        }


}





// exports.sendEmail = function(req, res, next, id) {
//   console.log( '  id = ', id); 

/*



Property.find({ _id : id }).exec(function(err, properties) { 
  
    if (err) {
>>>>>>> SendBlue-Email-3
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
<<<<<<< HEAD
      console.log('FollowUp Date properties = ', properties);
      res.jsonp(properties);
=======
      console.log( ' prop =', properties);
//  From here on send the email via Node MAiler. 
      res.jsonp(properties);


// create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport('smtps://libertytrustgroupllc@gmail.com:sharejim@smtp.gmail.com');

      var  httpTransport = 'https://';
      // setup e-mail data with unicode symbols
       var mailOptions = {
              to: 'jpca999@gmail.com',
              from: config.mailer.from,
              subject: 'Password Reset',
              text: 'Hello world ?' // plaintext body        
       };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error);
          }
          console.log('Message sent: ' + info.response);
      });



>>>>>>> SendBlue-Email-3
    }
  });
};





<<<<<<< HEAD
=======
exports.forgoto = function (req, res, next) {
>>>>>>> SendBlue-Email-3






<<<<<<< HEAD
=======
/*

exports.sendEmail = function(req, res, next, id) {
  console.log( '  id = ', id); 

  req.body.id = id; 

  async.waterfall([
    // Generate random token

function (done) {
  crypto.randomBytes(20, function (err, buffer) {
    var token = buffer.toString('hex');
    done(err, token);
  });
},
    // Lookup user by username


    function (token, done) {
      // if (req.body.username) {      
      if (true) {
        console.log( '338-PSC   req.body.id   =', req.body.id); 
        User.findOne({
          // username: req.body.username.toLowerCase()
          username: 'jpca999'          
        },  '-salt -password', function (err, user) {

          if (err || !user) {
            return res.status(400).send({
              message: 'No account with that username has been found'
            });
          } 

          else {
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function (err) {
              done(err, token, user);
            });
          }


        });
      } else {
        return res.status(422).send({
          message: 'Username field must not be blank'
        });
      }
    },



    function (token, user, done) {

      var httpTransport = 'http://';
      if (config.secure && config.secure.ssl === true) {
        httpTransport = 'https://';
      }
      var baseUrl = req.app.get('domain') || httpTransport + req.headers.host;
      res.render(path.resolve('modules/users/server/templates/reset-password-email'), {
        name: user.displayName,
        appName: config.app.title,
        url: baseUrl + '/api/auth/reset/' + token
      }, function (err, emailHTML) {
        done(err, emailHTML, user);
      });
    },
    // If valid email, send reset email using service
    function (emailHTML, user, done) {
      var mailOptions = {
        to: user.email,
        from: config.mailer.from,
        subject: 'Password Reset',
        html: emailHTML
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        if (!err) {
          res.send({
            message: 'An email has been sent to the provided email with further instructions.'
          });
        } else {
          return res.status(400).send({
            message: 'Failure sending email'
          });
        }

        done(err);
      });
    }
  ], function (err) {
    if (err) {
      return next(err);
    }
  });
};

*/




>>>>>>> SendBlue-Email-3



