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
  crypto = require('crypto'),
  chalk = require('chalk');


var smtpTransport = nodemailer.createTransport(config.mailer.options);




/**
 * List of Properties

exports.CohortPropertiesList = function(req, res) {
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

*/


/**
 * Create a Property
 */
exports.create = function(req, res) {
  console.log(' 47- PSC -  property . create');
  debugger;
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



exports.createProperty = function(req, res) {
  console.log(' 47- PSC -  createProperty   req.body =', req.body);
  // debugger;

  var property = new Property(req.body);

  property.user_logged_email = "libertytrustgroupllc@gmail.com";

  // property.user = req.user;

// console.log(' 71- PSC -  createProperty   property =', property);
  property.save(function(err) {
    if (err) {
      console.log(' 74- ERR found', err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(' 78- PSC-  property created', property);
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



/**
 *   Verify User
 */


var verifyUser = function (req, res, info) {

  console.log( ' checking   verify User');

  var email = info;
  User.findOne({email: email }).sort('-created').populate('user', 'displayName').exec(function (err, user) {

    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    else{
    // console.log( '151- psc   users =', user);
    // res.json(user);
    // return user;
    return true;
    }

return true;

  });

}


/**
 *   propertiesListByUser
 */


exports.propertiesListByUser = function(req, res, next, id) {

// console.log( '128- PSC propertiesListByUser   id = ', id);
// console.log( '130-psc  propertiesListByUser   req.body  = ', req.body);
// console.log( '%%%%%%%%%%%%%%%%^^^^^^^^^^^^^%%%%%%%%%');
  var username = req.body.username;
  var email = req.body.email;

async.waterfall([

    function(callback){
      // console.log(' 176-C =  inside first waterfall fun  id =', id);
                  User.findOne({email: id }).sort('-created').populate('user', 'displayName').exec(function (err, user) {
                  if (err || user === null ) {
                    console.log( ' sorry no user found with this ');
                    callback(err,null);
                    return;
                        // return res.status(422).send({
                        //     message: errorHandler.getErrorMessage(err)
                        //   });
                  }
                  // console.log( ' user found =', user);
                  callback(null, user);
            }); //end User.findOne
  },

  function (user, callback) {
        var username = req.body.username;
        var email = req.body.email;

        console.log( ' inside third waterfal fun  = ', username);
        console.log( ' 196-C inside third waterfal fun => id = ', id);

              Property.find({user_logged_email: id }).sort('-created').populate('user', 'displayName').exec(function(err, properties) {
                        if (err) {
                          callback(err,null);
                          return;
                        }
                        callback(null, properties);
                  });
        },


 ],
  function (err, result) {
    if ( err ){
      // console.log( '240-  err = ', err);
    }
    if( result === null ){  // idk if following works / is good
                        return res.status(422).send({
                            message: errorHandler.getErrorMessage(err)
                          });
    }
    console.log( '217-PSC properties = ', result);
    res.jsonp(result);
  }
  )

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

    // user_logged_email: id
    // IT HAS TO SEND USER_LOGGED_EMAIL IN BACKEND to get data back

exports.propertiesListByToday = function(req, res, next, id) {
  
  console.log(chalk.green('148--- propertiesListByToday id:' + id));

  // debugger;
  // Property.find({ last_date_email_sent_on : id }).exec(function(err, properties) {
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



exports.singlePropertySearchAPI = function(req, res, next, id) {
  console.log('164-psc - inside the singlePropertySearchAPI id=',id);

  Property.find({"address" : {$regex : '.*'+id+'*'}}).exec(function(err, properties) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log( ' properties = ', properties);
      res.jsonp(properties);
    }
  });
};



// properteis SEARCH API  VIA MODAL



exports.propertiesSearchAPI = function(req, res, next, id) {
  console.log( '186-psc -- calling  propertiesSearchAPI',id);

  // Property.find({"agent_name" : {$regex : ".*"+id+"*"}}).exec(function(err, properties) {

  Property.find( { $or: [ {"agent_name" : {$regex : ".*"+id+"*"}}, {"address" : {$regex : ".*"+id+"*"}} ] }  ).exec(function(err, properties) {
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

console.log('224-psc FollowUpSearch-API  id = ', id);
// var today = new Date();

var ho = id.toString();

console.log('229- PSC  ho = ', ho);
console.log( '  typeof stringValue ho  ', typeof ho)



// db.properties.find({"FollowUp_Call_Date" : {$gt: '2017-03-12T'}}).pretty();

   // Property.find({ "FollowUp_Call_Date": ho }).exec(function(err, properties) {

   // Property.find({ "FollowUp_Call_Date": {$gt: '2017-03-22'} }).exec(function(err, properties) {

   Property.find({ "FollowUp_Call_Date": ho }).exec(function(err, properties) {


    if (err) {
      // console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log('254-psc--FollowUp Date properties = ', properties);
      res.jsonp(properties);
    }
  });
};




exports.sendEmail = function(req, res, next, id) {


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
            message: 'Email sent to => '+properties[0].agent_name
          });

        } else {
          console.log( ' 366- psc   = inside Else with  ERR', err);
          return res.status(400).send({
            message: 'Failure sending email'+properties[0].agent_name
          });
        }

        done(err);
      });
            callback(null, 'done');
            // callback(err, 'done');
        }
}





exports.SvcEmail_SendMeDistressedListings = function(req, res, next, id) {

console.log( '359- S  calling   SvcEmail_SendMeDistressedListings   ');
console.log( ' 359 - id =  ', id);
console.log( ' 360 - req.body  =  ', req.body);
 // req.body.eSub  req.body.eBody
console.log( '363---calling  sendEmailTemplate___');
        async.waterfall([
            myFirstFunction,
            mySecondFunction,
            myLastFunction,
        ], function (err, result) {
            // result now equals 'done'
        });

        function myFirstFunction(callback) {
                              console.log( ' myFirstFunction');

             Property.find({"email_address" : {$regex : '.*'+id+'*'}}).exec(function(err, properties) {
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

          // res.render(path.resolve('modules/users/server/templates/statusOfProperty'), {
          res.render(path.resolve('modules/users/server/templates/SendMeDistressedListing'), {

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
        subject: 'we talked over the phone about'+properties[0].address+'  '+properties[0].city,
        // subject: req.body.eSub;
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
          console.log( ' 366- psc   = inside Else with  ERR', err);
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
















exports.sendEmailTemplate = function(req, res, next, id) {

console.log( ' 359 - id =  ', id);
console.log( ' 360 - req.body  =  ', req.body);
console.log( ' 483 -  req.body.emailBody,  = ', req.body.eBody);
 // req.body.eSub  req.body.eBody
console.log( '483---calling  sendEmailTemplate___');
        async.waterfall([
            myFirstFunction,
            mySecondFunction,
            myLastFunction,
        ], function (err, result) {
            // result now equals 'done'
        });

        function myFirstFunction(callback) {
                              console.log( ' myFirstFunction');

             Property.find({"email_address" : {$regex : '.*'+id+'*'}}).exec(function(err, properties) {
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
          // console.log( ' my-2-Function properties.agent_name =', properties[0].email_address);
          // console.log( ' my-2-Function arg2 =', arg2);

          // console.log('282- psc --- mySecondFunction  properties = ', properties);
          var httpTransport = 'http://';
          if (config.secure && config.secure.ssl === true) {
              httpTransport = 'https://';
          }
          var baseUrl = req.app.get('domain') || httpTransport + req.headers.host;

          // console.log( '288-psc  baseUrl = ', baseUrl);

          // res.render(path.resolve('modules/users/server/templates/statusOfProperty'), {
          res.render(path.resolve('modules/users/server/templates/sendEmailTemplate'), {

              // name: properties[0].agent_name,

              content: req.body.eBody,
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
        // subject: 'we talked over the phone about'+properties[0].address+'  '+properties[0].city,
        subject: req.body.eSub,
        address: properties[0].address,
        html: emailHTML
      };
      smtpTransport.sendMail(mailOptions, function (err) {

        if (!err) {
          console.log( ' 565- psc   = inside smtp Transport - i.e no error');
        // return res.send();
       return   res.send({
            message: 'An email has been sent to the provided email with further instructions.'
          });

        } else {
          console.log( ' 366- psc   = inside Else with  ERR', err);
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



var Zillow  = require('node-zillow')
var fs=require('fs');
// var Promise = require('promise');


var zwsid = 'X1-ZWz1fq2lnurjez_2kpit';
var zillow = new Zillow(zwsid);


exports.grabCmpAPI = function(req, res, next, id) {
console.log('734-PSC  hi coming from  grabCmpAPI placeDetails id = ', id);


console.log('736-PSC  hi coming from  req.body= ', req.body);
console.log('736-PSC  BEFORE req.body.street_short = ', req.body.street_short);





var addressWithoutUpdates = {};
addressWithoutUpdates.mid = ' ';

addressWithoutUpdates.address = req.body.street_short + addressWithoutUpdates.mid + req.body.address_short + addressWithoutUpdates.mid + req.body.city;
// addressWithoutUpdates.address = "615 Bernal Ave, Sunnyvale";
addressWithoutUpdates.citystatezip = req.body.postal;
// addressWithoutUpdates.citystatezip = "94085";

console.log( ' 741-PSC   addressWithoutUpdates =', addressWithoutUpdates);


function _function1 (req) {

    return function (callback) {
      console.log( ' insdie fun 1  addressWithoutUpdates', addressWithoutUpdates);
        // var something = req.body;
        callback (null, req);
   }
}

function _function2(req, callback) {





// addressWithoutUpdates.new_CityStateZip = ;

console.log('Inside fun 2   addressWithoutUpdates =', addressWithoutUpdates);
      // var zpid = addressWithoutUpdates.response.results.result[0].zpid[0];
 console.log('Inside fun 2   req.body =', req.body);





// new
var a = req.body.formatted_address;
console.log( ' 781-PSC   a =', a);


var split_formatted_address = a.split(',');
console.log(' split_formatted_address =', split_formatted_address);

var address = split_formatted_address[0];
console.log( '1962-C address = ', address);
// grab the rest of the string from the a.

var City = split_formatted_address[1];
console.log( 'City= ', City);

var StateStr = split_formatted_address[2];
console.log( 'StateStr= ', StateStr);

var stateSplit = StateStr.match(/[a-zA-Z]+|[0-9]+/g)
console.log( 'stateSplit= ', stateSplit);

var State = stateSplit[0];
console.log( ' STate = ', State);

var zip = stateSplit[1];
console.log( ' zip = ', zip);

var Addrr = address +','+ City;
console.log( '1987-  adder  = ', Addrr );

var zipCode = stateSplit[1];
console.log( ' zip = ', zipCode);

// new



var addressWithoutUpdates = {};
addressWithoutUpdates.address = Addrr;
addressWithoutUpdates.citystatezip = zipCode;
addressWithoutUpdates.formatted_address = req.body.formatted_address;

console.log('830-PSC addressWithoutUpdates= ', addressWithoutUpdates);

        var somethingelse = zillow.get('GetSearchResults', addressWithoutUpdates).then(function (firstRes) {

              console.log('781-S  propertiesSearchAPI firstRes = ', firstRes);
              console.log('781-S  propertiesSearchAPI firstRes zip = ', firstRes.response.results.result[0].zpid);
              var zip =  firstRes.response.results.result[0].zpid;
        callback (null, zip);
          });


}

function _function3(something, callback) {
    console.log( ' inside fun 3,  param something ', something);


      var addressWithupdates = {};
      addressWithupdates.zpid = something;
      addressWithupdates.count = 25;



        var somethingelse = zillow.get('GetDeepComps', addressWithupdates).then(function (secondRes) {

              console.log('781-S  propertiesSearchAPI firstRes = ', secondRes);

               callback (null, secondRes);
          });

}



   async.waterfall([
        _function1(req),
        _function2,
        _function3,
    ], function (error, message) {
        if (error) { console.log('Something is wrong!'); }
        // return alert('Done!');
        console.log(' Done!');
        console.log('success  ! = ', message);


           var backComps = {};
            backComps.zpid = message.request.zpid;
          console.log('796-psc   backComps.zpid =', backComps.zpid);


                backComps.propLat = message.response.properties.principal[0].address[0].latitude;
                backComps.propLong = message.response.properties.principal[0].address[0].longitude;
                backComps.cmpArr = message.response.properties.comparables[0].comp;

              console.log('803 - backComps = ', backComps);
                // var

                res.jsonp(backComps);



    });







}   //  END  grabCompAPI
