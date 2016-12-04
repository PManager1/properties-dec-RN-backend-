'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Property = mongoose.model('Property'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  property;

/**
 * Property routes tests
 */
describe('Property CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Property
    user.save(function () {
      property = {
        name: 'Property name'
      };

      done();
    });
  });

  it('should be able to save a Property if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Property
        agent.post('/api/properties')
          .send(property)
          .expect(200)
          .end(function (propertySaveErr, propertySaveRes) {
            // Handle Property save error
            if (propertySaveErr) {
              return done(propertySaveErr);
            }

            // Get a list of Properties
            agent.get('/api/properties')
              .end(function (propertiesGetErr, propertiesGetRes) {
                // Handle Properties save error
                if (propertiesGetErr) {
                  return done(propertiesGetErr);
                }

                // Get Properties list
                var properties = propertiesGetRes.body;

                // Set assertions
                (properties[0].user._id).should.equal(userId);
                (properties[0].name).should.match('Property name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Property if not logged in', function (done) {
    agent.post('/api/properties')
      .send(property)
      .expect(403)
      .end(function (propertySaveErr, propertySaveRes) {
        // Call the assertion callback
        done(propertySaveErr);
      });
  });

  it('should not be able to save an Property if no name is provided', function (done) {
    // Invalidate name field
    property.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Property
        agent.post('/api/properties')
          .send(property)
          .expect(400)
          .end(function (propertySaveErr, propertySaveRes) {
            // Set message assertion
            (propertySaveRes.body.message).should.match('Please fill Property name');

            // Handle Property save error
            done(propertySaveErr);
          });
      });
  });

  it('should be able to update an Property if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Property
        agent.post('/api/properties')
          .send(property)
          .expect(200)
          .end(function (propertySaveErr, propertySaveRes) {
            // Handle Property save error
            if (propertySaveErr) {
              return done(propertySaveErr);
            }

            // Update Property name
            property.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Property
            agent.put('/api/properties/' + propertySaveRes.body._id)
              .send(property)
              .expect(200)
              .end(function (propertyUpdateErr, propertyUpdateRes) {
                // Handle Property update error
                if (propertyUpdateErr) {
                  return done(propertyUpdateErr);
                }

                // Set assertions
                (propertyUpdateRes.body._id).should.equal(propertySaveRes.body._id);
                (propertyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Properties if not signed in', function (done) {
    // Create new Property model instance
    var propertyObj = new Property(property);

    // Save the property
    propertyObj.save(function () {
      // Request Properties
      request(app).get('/api/properties')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Property if not signed in', function (done) {
    // Create new Property model instance
    var propertyObj = new Property(property);

    // Save the Property
    propertyObj.save(function () {
      request(app).get('/api/properties/' + propertyObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', property.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Property with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/properties/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Property is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Property which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Property
    request(app).get('/api/properties/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Property with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Property if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Property
        agent.post('/api/properties')
          .send(property)
          .expect(200)
          .end(function (propertySaveErr, propertySaveRes) {
            // Handle Property save error
            if (propertySaveErr) {
              return done(propertySaveErr);
            }

            // Delete an existing Property
            agent.delete('/api/properties/' + propertySaveRes.body._id)
              .send(property)
              .expect(200)
              .end(function (propertyDeleteErr, propertyDeleteRes) {
                // Handle property error error
                if (propertyDeleteErr) {
                  return done(propertyDeleteErr);
                }

                // Set assertions
                (propertyDeleteRes.body._id).should.equal(propertySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Property if not signed in', function (done) {
    // Set Property user
    property.user = user;

    // Create new Property model instance
    var propertyObj = new Property(property);

    // Save the Property
    propertyObj.save(function () {
      // Try deleting Property
      request(app).delete('/api/properties/' + propertyObj._id)
        .expect(403)
        .end(function (propertyDeleteErr, propertyDeleteRes) {
          // Set message assertion
          (propertyDeleteRes.body.message).should.match('User is not authorized');

          // Handle Property error error
          done(propertyDeleteErr);
        });

    });
  });

  it('should be able to get a single Property that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Property
          agent.post('/api/properties')
            .send(property)
            .expect(200)
            .end(function (propertySaveErr, propertySaveRes) {
              // Handle Property save error
              if (propertySaveErr) {
                return done(propertySaveErr);
              }

              // Set assertions on new Property
              (propertySaveRes.body.name).should.equal(property.name);
              should.exist(propertySaveRes.body.user);
              should.equal(propertySaveRes.body.user._id, orphanId);

              // force the Property to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Property
                    agent.get('/api/properties/' + propertySaveRes.body._id)
                      .expect(200)
                      .end(function (propertyInfoErr, propertyInfoRes) {
                        // Handle Property error
                        if (propertyInfoErr) {
                          return done(propertyInfoErr);
                        }

                        // Set assertions
                        (propertyInfoRes.body._id).should.equal(propertySaveRes.body._id);
                        (propertyInfoRes.body.name).should.equal(property.name);
                        should.equal(propertyInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Property.remove().exec(done);
    });
  });
});
