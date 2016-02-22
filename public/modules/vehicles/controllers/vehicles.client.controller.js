'use strict';

// Vehicles controller
angular.module('vehicles').controller('VehiclesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vehicles',
	function($scope, $stateParams, $location, Authentication, Vehicles) {

        this.authentication = Authentication;

        // Find a list of Vehicles
        this.vehicles = Vehicles.query();

        // Find existing Vehicle
        this.findOne = function() {
            this.currentVehicle = Vehicles.get({
                 vehicleId: $stateParams.vehicleId
            });
        };
    }
]);
