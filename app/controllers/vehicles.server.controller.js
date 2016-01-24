'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Vehicle = mongoose.model('Vehicle'),
	_ = require('lodash');

/**
 * Create a Vehicle
 */
exports.create = function(req, res) {
	var vehicle = new Vehicle(req.body);
	vehicle.user = req.user;

	vehicle.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vehicle);
		}
	});
};

/**
 * Show the current Vehicle
 */
exports.read = function(req, res) {
	res.jsonp(req.vehicle);
};

/**
 * Update a Vehicle
 */
exports.update = function(req, res) {
	var vehicle = req.vehicle ;

	vehicle = _.extend(vehicle , req.body);

	vehicle.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vehicle);
		}
	});
};

/**
 * Delete a Vehicle
 */
exports.delete = function(req, res) {
	var vehicle = req.vehicle ;

	vehicle.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vehicle);
		}
	});
};

/**
 * List of Vehicles
 */
exports.list = function(req, res) {
	Vehicle.find().sort('-created').populate('user', 'displayName').exec(function(err, vehicles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vehicles);
		}
	});
};

/**
 * Vehicle middleware
 */
exports.vehicleByID = function(req, res, next, id) {
	Vehicle.findById(id).populate('user', 'displayName').exec(function(err, vehicle) {
		if (err) return next(err);
		if (! vehicle) return next(new Error('Failed to load Vehicle ' + id));
		req.vehicle = vehicle ;
		next();
	});
};

/**
 * Vehicle authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.vehicle.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
