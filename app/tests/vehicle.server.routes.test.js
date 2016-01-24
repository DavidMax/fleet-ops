'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Vehicle = mongoose.model('Vehicle'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, vehicle;

/**
 * Vehicle routes tests
 */
describe('Vehicle CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
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

		// Save a user to the test db and create new Vehicle
		user.save(function() {
			vehicle = {
				name: 'Vehicle Name'
			};

			done();
		});
	});

	it('should be able to save Vehicle instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vehicle
				agent.post('/vehicles')
					.send(vehicle)
					.expect(200)
					.end(function(vehicleSaveErr, vehicleSaveRes) {
						// Handle Vehicle save error
						if (vehicleSaveErr) done(vehicleSaveErr);

						// Get a list of Vehicles
						agent.get('/vehicles')
							.end(function(vehiclesGetErr, vehiclesGetRes) {
								// Handle Vehicle save error
								if (vehiclesGetErr) done(vehiclesGetErr);

								// Get Vehicles list
								var vehicles = vehiclesGetRes.body;

								// Set assertions
								(vehicles[0].user._id).should.equal(userId);
								(vehicles[0].name).should.match('Vehicle Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Vehicle instance if not logged in', function(done) {
		agent.post('/vehicles')
			.send(vehicle)
			.expect(401)
			.end(function(vehicleSaveErr, vehicleSaveRes) {
				// Call the assertion callback
				done(vehicleSaveErr);
			});
	});

	it('should not be able to save Vehicle instance if no name is provided', function(done) {
		// Invalidate name field
		vehicle.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vehicle
				agent.post('/vehicles')
					.send(vehicle)
					.expect(400)
					.end(function(vehicleSaveErr, vehicleSaveRes) {
						// Set message assertion
						(vehicleSaveRes.body.message).should.match('Please fill Vehicle name');

						// Handle Vehicle save error
						done(vehicleSaveErr);
					});
			});
	});

	it('should be able to update Vehicle instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vehicle
				agent.post('/vehicles')
					.send(vehicle)
					.expect(200)
					.end(function(vehicleSaveErr, vehicleSaveRes) {
						// Handle Vehicle save error
						if (vehicleSaveErr) done(vehicleSaveErr);

						// Update Vehicle name
						vehicle.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Vehicle
						agent.put('/vehicles/' + vehicleSaveRes.body._id)
							.send(vehicle)
							.expect(200)
							.end(function(vehicleUpdateErr, vehicleUpdateRes) {
								// Handle Vehicle update error
								if (vehicleUpdateErr) done(vehicleUpdateErr);

								// Set assertions
								(vehicleUpdateRes.body._id).should.equal(vehicleSaveRes.body._id);
								(vehicleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Vehicles if not signed in', function(done) {
		// Create new Vehicle model instance
		var vehicleObj = new Vehicle(vehicle);

		// Save the Vehicle
		vehicleObj.save(function() {
			// Request Vehicles
			request(app).get('/vehicles')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Vehicle if not signed in', function(done) {
		// Create new Vehicle model instance
		var vehicleObj = new Vehicle(vehicle);

		// Save the Vehicle
		vehicleObj.save(function() {
			request(app).get('/vehicles/' + vehicleObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', vehicle.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Vehicle instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vehicle
				agent.post('/vehicles')
					.send(vehicle)
					.expect(200)
					.end(function(vehicleSaveErr, vehicleSaveRes) {
						// Handle Vehicle save error
						if (vehicleSaveErr) done(vehicleSaveErr);

						// Delete existing Vehicle
						agent.delete('/vehicles/' + vehicleSaveRes.body._id)
							.send(vehicle)
							.expect(200)
							.end(function(vehicleDeleteErr, vehicleDeleteRes) {
								// Handle Vehicle error error
								if (vehicleDeleteErr) done(vehicleDeleteErr);

								// Set assertions
								(vehicleDeleteRes.body._id).should.equal(vehicleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Vehicle instance if not signed in', function(done) {
		// Set Vehicle user
		vehicle.user = user;

		// Create new Vehicle model instance
		var vehicleObj = new Vehicle(vehicle);

		// Save the Vehicle
		vehicleObj.save(function() {
			// Try deleting Vehicle
			request(app).delete('/vehicles/' + vehicleObj._id)
			.expect(401)
			.end(function(vehicleDeleteErr, vehicleDeleteRes) {
				// Set message assertion
				(vehicleDeleteRes.body.message).should.match('User is not logged in');

				// Handle Vehicle error error
				done(vehicleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Vehicle.remove().exec();
		done();
	});
});

