'use strict';

// Configuring the Vehicles module
angular.module('vehicles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Vehicles', 'vehicles', 'dropdown', '/vehicles(/create)?');
		Menus.addSubMenuItem('topbar', 'vehicles', 'List Vehicles', 'vehicles');
		Menus.addSubMenuItem('topbar', 'vehicles', 'New Vehicle', 'vehicles/create');
	}
]);
