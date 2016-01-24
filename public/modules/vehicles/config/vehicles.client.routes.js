'use strict';

//Setting up route
angular.module('vehicles').config(['$stateProvider',
	function($stateProvider) {
		// Vehicles state routing
		$stateProvider.
		state('listVehicles', {
			url: '/vehicles',
			templateUrl: 'modules/vehicles/views/list-vehicles.client.view.html'
		}).
		state('createVehicle', {
			url: '/vehicles/create',
			templateUrl: 'modules/vehicles/views/create-vehicle.client.view.html'
		}).
		state('viewVehicle', {
			url: '/vehicles/:vehicleId',
			templateUrl: 'modules/vehicles/views/view-vehicle.client.view.html'
		}).
		state('editVehicle', {
			url: '/vehicles/:vehicleId/edit',
			templateUrl: 'modules/vehicles/views/edit-vehicle.client.view.html'
		});
	}
]);

