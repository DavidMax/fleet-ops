'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        // TODO: Convert this to a service
		$scope.alerts = [
            {
                icon: 'fa-truck fa-2x',
                color: 'btn-danger',
                total: '1462',
                description: 'Trucks'
            },
            {
                icon: 'fa-ship fa-2x',
                color: 'btn-warning',
                total: '57',
                description: 'Ships'
            },
            {
                icon: 'fa-plane fa-2x',
                color: 'btn-warning',
                total: '41',
                description: 'Planes'
            },
            {
                icon: 'fa-train fa-2x',
                color: 'btn-success',
                total: '398',
                description: 'Trains'
            },
            {
                icon: 'fa-wrench fa-2x',
                color: 'btn-info',
                total: '12',
                description: 'Maintenance Requests'
            },
            {
                icon: 'fa-users fa-2x',
                color: 'btn-info',
                total: '491',
                description: 'Operators'
            }
		];
	}
]);
