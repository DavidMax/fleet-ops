'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Vehicle Schema
 */
var VehicleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please add vehicle name',
		trim: true
	},
	type: {
		type: String,
		default: '',
		required: 'Please add vehicle type',
		trim: true
	},
	status: {
		type: String,
		default: '',
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	fuelType: {
		type: String,
		default: '',
		trim: true
	},
	lastInspection: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Vehicle', VehicleSchema);

