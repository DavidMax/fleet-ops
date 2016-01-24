'use strict';

(function() {
	// Vehicles Controller Spec
	describe('Vehicles Controller Tests', function() {
		// Initialize global variables
		var VehiclesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Vehicles controller.
			VehiclesController = $controller('VehiclesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Vehicle object fetched from XHR', inject(function(Vehicles) {
			// Create sample Vehicle using the Vehicles service
			var sampleVehicle = new Vehicles({
				name: 'New Vehicle'
			});

			// Create a sample Vehicles array that includes the new Vehicle
			var sampleVehicles = [sampleVehicle];

			// Set GET response
			$httpBackend.expectGET('vehicles').respond(sampleVehicles);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.vehicles).toEqualData(sampleVehicles);
		}));

		it('$scope.findOne() should create an array with one Vehicle object fetched from XHR using a vehicleId URL parameter', inject(function(Vehicles) {
			// Define a sample Vehicle object
			var sampleVehicle = new Vehicles({
				name: 'New Vehicle'
			});

			// Set the URL parameter
			$stateParams.vehicleId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/vehicles\/([0-9a-fA-F]{24})$/).respond(sampleVehicle);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.vehicle).toEqualData(sampleVehicle);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Vehicles) {
			// Create a sample Vehicle object
			var sampleVehiclePostData = new Vehicles({
				name: 'New Vehicle'
			});

			// Create a sample Vehicle response
			var sampleVehicleResponse = new Vehicles({
				_id: '525cf20451979dea2c000001',
				name: 'New Vehicle'
			});

			// Fixture mock form input values
			scope.name = 'New Vehicle';

			// Set POST response
			$httpBackend.expectPOST('vehicles', sampleVehiclePostData).respond(sampleVehicleResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Vehicle was created
			expect($location.path()).toBe('/vehicles/' + sampleVehicleResponse._id);
		}));

		it('$scope.update() should update a valid Vehicle', inject(function(Vehicles) {
			// Define a sample Vehicle put data
			var sampleVehiclePutData = new Vehicles({
				_id: '525cf20451979dea2c000001',
				name: 'New Vehicle'
			});

			// Mock Vehicle in scope
			scope.vehicle = sampleVehiclePutData;

			// Set PUT response
			$httpBackend.expectPUT(/vehicles\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/vehicles/' + sampleVehiclePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid vehicleId and remove the Vehicle from the scope', inject(function(Vehicles) {
			// Create new Vehicle object
			var sampleVehicle = new Vehicles({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Vehicles array and include the Vehicle
			scope.vehicles = [sampleVehicle];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/vehicles\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleVehicle);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.vehicles.length).toBe(0);
		}));
	});
}());