(function(){

    'use strict';

    angular
    .module('vehicles')
    .controller('EditVehicleController', ['Vehicles', '$location', '$stateParams',
        function(Vehicles, $location, $stateParams) {

                    // Find existing Vehicle
		    this.findOne = function() {
		        this.currentVehicle = Vehicles.get({
		             vehicleId: $stateParams.vehicleId
		        });
		    };

	        // Update existing Vehicle
	        this.update = function() {
	            var currentVehicle = this.currentVehicle;

	            currentVehicle.$update(function() {
	                $location.path('vehicles/' + currentVehicle._id);
	            },

	            function(errorResponse) {
	                currentVehicle.error = errorResponse.data.message;
	            });
	        };

	    }
	]);

}());

