'use strict';

//Vehicles service used to communicate with Vehicles REST endpoints
angular.module('vehicles').factory('Vehicles', ['$resource',
	function($resource) {
		return $resource('vehicles/:vehicleId', { vehicleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

