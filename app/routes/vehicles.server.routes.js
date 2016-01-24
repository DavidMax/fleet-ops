'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var vehicles = require('../../app/controllers/vehicles.server.controller');

	// Vehicles Routes
	app.route('/vehicles')
		.get(vehicles.list)
		.post(users.requiresLogin, vehicles.create);

	app.route('/vehicles/:vehicleId')
		.get(vehicles.read)
		.put(users.requiresLogin, vehicles.hasAuthorization, vehicles.update)
		.delete(users.requiresLogin, vehicles.hasAuthorization, vehicles.delete);

	// Finish by binding the Vehicle middleware
	app.param('vehicleId', vehicles.vehicleByID);
};
