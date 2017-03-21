'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Reifax = mongoose.model('Reifax'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  reifax;

/**
 * Reifax routes tests
 */
describe('Reifax CRUD tests', function () {

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

    // Save a user to the test db and create new Reifax
    user.save(function () {
      reifax = {
        name: 'Reifax name'
      };

      done();
    });
  });

  it('should be able to save a Reifax if logged in', function (done) {
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

        // Save a new Reifax
        agent.post('/api/reifaxes')
          .send(reifax)
          .expect(200)
          .end(function (reifaxSaveErr, reifaxSaveRes) {
            // Handle Reifax save error
            if (reifaxSaveErr) {
              return done(reifaxSaveErr);
            }

            // Get a list of Reifaxes
            agent.get('/api/reifaxes')
              .end(function (reifaxesGetErr, reifaxesGetRes) {
                // Handle Reifaxes save error
                if (reifaxesGetErr) {
                  return done(reifaxesGetErr);
                }

                // Get Reifaxes list
                var reifaxes = reifaxesGetRes.body;

                // Set assertions
                (reifaxes[0].user._id).should.equal(userId);
                (reifaxes[0].name).should.match('Reifax name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Reifax if not logged in', function (done) {
    agent.post('/api/reifaxes')
      .send(reifax)
      .expect(403)
      .end(function (reifaxSaveErr, reifaxSaveRes) {
        // Call the assertion callback
        done(reifaxSaveErr);
      });
  });

  it('should not be able to save an Reifax if no name is provided', function (done) {
    // Invalidate name field
    reifax.name = '';

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

        // Save a new Reifax
        agent.post('/api/reifaxes')
          .send(reifax)
          .expect(400)
          .end(function (reifaxSaveErr, reifaxSaveRes) {
            // Set message assertion
            (reifaxSaveRes.body.message).should.match('Please fill Reifax name');

            // Handle Reifax save error
            done(reifaxSaveErr);
          });
      });
  });

  it('should be able to update an Reifax if signed in', function (done) {
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

        // Save a new Reifax
        agent.post('/api/reifaxes')
          .send(reifax)
          .expect(200)
          .end(function (reifaxSaveErr, reifaxSaveRes) {
            // Handle Reifax save error
            if (reifaxSaveErr) {
              return done(reifaxSaveErr);
            }

            // Update Reifax name
            reifax.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Reifax
            agent.put('/api/reifaxes/' + reifaxSaveRes.body._id)
              .send(reifax)
              .expect(200)
              .end(function (reifaxUpdateErr, reifaxUpdateRes) {
                // Handle Reifax update error
                if (reifaxUpdateErr) {
                  return done(reifaxUpdateErr);
                }

                // Set assertions
                (reifaxUpdateRes.body._id).should.equal(reifaxSaveRes.body._id);
                (reifaxUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Reifaxes if not signed in', function (done) {
    // Create new Reifax model instance
    var reifaxObj = new Reifax(reifax);

    // Save the reifax
    reifaxObj.save(function () {
      // Request Reifaxes
      request(app).get('/api/reifaxes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Reifax if not signed in', function (done) {
    // Create new Reifax model instance
    var reifaxObj = new Reifax(reifax);

    // Save the Reifax
    reifaxObj.save(function () {
      request(app).get('/api/reifaxes/' + reifaxObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', reifax.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Reifax with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/reifaxes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Reifax is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Reifax which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Reifax
    request(app).get('/api/reifaxes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Reifax with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Reifax if signed in', function (done) {
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

        // Save a new Reifax
        agent.post('/api/reifaxes')
          .send(reifax)
          .expect(200)
          .end(function (reifaxSaveErr, reifaxSaveRes) {
            // Handle Reifax save error
            if (reifaxSaveErr) {
              return done(reifaxSaveErr);
            }

            // Delete an existing Reifax
            agent.delete('/api/reifaxes/' + reifaxSaveRes.body._id)
              .send(reifax)
              .expect(200)
              .end(function (reifaxDeleteErr, reifaxDeleteRes) {
                // Handle reifax error error
                if (reifaxDeleteErr) {
                  return done(reifaxDeleteErr);
                }

                // Set assertions
                (reifaxDeleteRes.body._id).should.equal(reifaxSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Reifax if not signed in', function (done) {
    // Set Reifax user
    reifax.user = user;

    // Create new Reifax model instance
    var reifaxObj = new Reifax(reifax);

    // Save the Reifax
    reifaxObj.save(function () {
      // Try deleting Reifax
      request(app).delete('/api/reifaxes/' + reifaxObj._id)
        .expect(403)
        .end(function (reifaxDeleteErr, reifaxDeleteRes) {
          // Set message assertion
          (reifaxDeleteRes.body.message).should.match('User is not authorized');

          // Handle Reifax error error
          done(reifaxDeleteErr);
        });

    });
  });

  it('should be able to get a single Reifax that has an orphaned user reference', function (done) {
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

          // Save a new Reifax
          agent.post('/api/reifaxes')
            .send(reifax)
            .expect(200)
            .end(function (reifaxSaveErr, reifaxSaveRes) {
              // Handle Reifax save error
              if (reifaxSaveErr) {
                return done(reifaxSaveErr);
              }

              // Set assertions on new Reifax
              (reifaxSaveRes.body.name).should.equal(reifax.name);
              should.exist(reifaxSaveRes.body.user);
              should.equal(reifaxSaveRes.body.user._id, orphanId);

              // force the Reifax to have an orphaned user reference
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

                    // Get the Reifax
                    agent.get('/api/reifaxes/' + reifaxSaveRes.body._id)
                      .expect(200)
                      .end(function (reifaxInfoErr, reifaxInfoRes) {
                        // Handle Reifax error
                        if (reifaxInfoErr) {
                          return done(reifaxInfoErr);
                        }

                        // Set assertions
                        (reifaxInfoRes.body._id).should.equal(reifaxSaveRes.body._id);
                        (reifaxInfoRes.body.name).should.equal(reifax.name);
                        should.equal(reifaxInfoRes.body.user, undefined);

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
      Reifax.remove().exec(done);
    });
  });
});
