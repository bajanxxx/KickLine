'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('LandingPageController', [function() {

	}])
	.controller('WaitlistController', ['$scope', 'customerService', 'textMessageService', 'authService', function($scope, customerService, textMessageService, authService) {
		
		// Bind user's customers to $scope.customers.
		authService.getCurrentUser().then(function(user) {
			if (user) {
				$scope.customers = customerService.getCustomersByUserId(user.id);
			}
		})

		// Object to store data from the waitlist form.
		$scope.newCustomer = {name: '', phone: '', size: '', done: false, notified: 'No'};

		// Function to save a new customer to the waitlist.
		$scope.saveCustomer = function() {
			customerService.saveCustomer($scope.newCustomer, $scope.currentUser.id);
			$scope.newCustomer = {name: '', phone: '', size: '', done: false, notified: 'No'};
		};

		// Function to send text messgae to a customer.
		$scope.sendTextMessage = function(customer) {
			textMessageService.sendTextMessage(customer, $scope.currentUser.id);
		};
	}])
	.controller('AuthController', ['$scope', 'authService', function($scope, authService) {
		// Object bound to inputs on the register and login pages.
		$scope.user = {email: '', password: ''};

		// Method to register a new user using the authService.
		$scope.register = function() {
			authService.register($scope.user);
		};

		// Method to log in a user using the authService.
		$scope.login = function() {
			authService.login($scope.user);
		};

		// Method to log out a user using the authService.
		$scope.logout = function() {
			authService.logout();
		};

	}]); 




























		