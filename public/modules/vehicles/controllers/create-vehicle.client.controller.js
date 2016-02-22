(function(){

    'use strict';

    angular
    .module('vehicles')
    .controller('CreateVehicleController', ['$scope', '$location', 'Vehicles', '$stateParams', '$location',
        function($scope, $location, Vehicles, $stateParams) {

            // Create new Vehicle
            this.create = function() {
                // Create new Vehicle object
                var vehicle = new Vehicles ({
                    name: this.name,
                    type: this.type,
                    status: this.status,
                    description: this.description,
                    fuelType: this.fuelType,
                });

                // Redirect after save
                vehicle.$save(function(response) {
                    $location.path('vehicles/' + response._id);

                    // Clear form fields
                    vehicle.name = '';
                    vehicle.type = '';
                    vehicle.status = '';
                    vehicle.description = '';
                    vehicle.fuelType = '';
                },

                function(errorResponse) {
                    vehicle.error = errorResponse.data.message;
                });
            };

        }
    ]);

}());

