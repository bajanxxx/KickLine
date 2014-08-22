'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('LandingPageController', [function() {

	}])
	.controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase) {
		// Connect $scope.parties to live Firebase data.
		var customersRef = new Firebase('https://waitandeat-norm.firebaseio.com/customers');
		$scope.customers = $firebase(customersRef);

		// Object to store data from the waitlist form.
		$scope.newCustomer = {name: '', phone: '', size: '', done: false, notified: 'No'};

		// Function to save a new party to the waitlist.
		$scope.saveCustomer = function() {
			$scope.customers.$add($scope.newCustomer);
			$scope.newCustomer = {name: '', phone: '', size: '', done: false, notified: 'No'};
		};

		// Function to send text messgae to a party.
		$scope.sendTextMessage = function(party) {
			var textMessageRef = new Firebase('https://kickline-norm.firebaseio.com/textMessages');
			var textMessages = $firebase(textMessageRef);
			var newTextMessage = {
				phoneNumber: customer.phone, 
				size: customer.size,
				name: customer.name
			};
			textMessages.$add(newTextMessage);
			customer.notified = 'Yes';
			$scope.customers.$save(customer.$id);
		};
	}])
	.controller('AuthController', ['$scope', '$firebaseSimpleLogin', function($scope, $firebaseSimpleLogin) {
		var authRef = new Firebase('https://kickline-norm.firebaseio.com/');
		var auth = $firebaseSimpleLogin(authRef);

		$scope.user = {email: '', password: ''};

		$scope.register = function() {
			auth.$createUser($scope.user.email, $scope.user.password).then(function(data) {
				console.log(data);
			});
		};
	}]);













		