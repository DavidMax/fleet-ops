(function(){

    'use strict';

	angular
	.module('vehicles')
	.controller('ViewVehicleController', ['$scope', 'Vehicles', '$stateParams', '$location', 'Authentication',
	    function($scope, Vehicles, $stateParams, $location, Authentication) {

                this.authentication = Authentication;

                // Find existing Vehicle
	        this.findOne = function() {
                    this.currentVehicle = Vehicles.get({
                        vehicleId: $stateParams.vehicleId
                    });
                };


                // Remove existing Vehicle
	        this.remove = function(currentVehicle) {

	            this.currentVehicle.$remove(function() {
	                $location.path('vehicles');
	            });

	        };
	    }
	]);
}());

