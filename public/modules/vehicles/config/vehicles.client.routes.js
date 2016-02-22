'use strict';

//Setting up route
angular.module('vehicles').config(['$stateProvider',
	function($stateProvider) {
		// Vehicles state routing
		$stateProvider.
		state('listVehicles', {
			url: '/vehicles',
			templateUrl: 'modules/vehicles/views/list-vehicles.client.view.html',
			controller: 'VehiclesController',
			controllerAs: 'vehiclesCtrl'
		}).
		state('createVehicle', {
			url: '/vehicles/create',
			templateUrl: 'modules/vehicles/views/create-vehicle.client.view.html',
			controller: 'CreateVehicleController',
			controllerAs: 'createVehicleCtrl'
		}).
		state('viewVehicle', {
			url: '/vehicles/:vehicleId',
			templateUrl: 'modules/vehicles/views/view-vehicle.client.view.html'
		}).
		state('editVehicle', {
			url: '/vehicles/:vehicleId/edit',
			templateUrl: 'modules/vehicles/views/edit-vehicle.client.view.html',
			controller: 'EditVehicleController',
			controllerAs: 'editVehicleCtrl'
		});
	}
]);

