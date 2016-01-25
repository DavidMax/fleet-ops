'use strict';

// Vehicles controller
angular.module('vehicles').controller('VehiclesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vehicles',
	function($scope, $stateParams, $location, Authentication, Vehicles) {
		$scope.authentication = Authentication;

		// Create new Vehicle
		$scope.create = function() {
			// Create new Vehicle object
			var vehicle = new Vehicles ({
				name: this.name,
				type: this.type,
				status: this.status,
				description: this.description,
				fuelType: this.fuelType,
				lastInspection: this.lastInspection
			});

			// Redirect after save
			vehicle.$save(function(response) {
				$location.path('vehicles/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.type = '';
				$scope.status = '';
				$scope.description = '';
				$scope.fuelType = '';
				$scope.lastInspection = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Vehicle
		$scope.remove = function(vehicle) {
			if ( vehicle ) {
				vehicle.$remove();

				for (var i in $scope.vehicles) {
					if ($scope.vehicles [i] === vehicle) {
						$scope.vehicles.splice(i, 1);
					}
				}
			} else {
				$scope.vehicle.$remove(function() {
					$location.path('vehicles');
				});
			}
		};

		// Update existing Vehicle
		$scope.update = function() {
			var vehicle = $scope.vehicle;

			vehicle.$update(function() {
				$location.path('vehicles/' + vehicle._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Vehicles
		$scope.find = function() {
			$scope.vehicles = Vehicles.query();
		};

		// Find existing Vehicle
		$scope.findOne = function() {
			$scope.vehicle = Vehicles.get({
				vehicleId: $stateParams.vehicleId
			});
		};
	}
]);

