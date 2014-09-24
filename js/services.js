'use strict';

/* Services */

angular.module('myApp.services', [])
	.value('FIREBASE_URL', 'https://kickline-norm.firebaseio.com/')
	.factory('dataService', function($firebase, FIREBASE_URL) {
		var dataRef = new Firebase(FIREBASE_URL);
		var fireData = $firebase(dataRef);

		return fireData;
	})
	.factory('customerService', function(dataService) {
	var users = dataService.$child('users');

		var customerServiceObject = {
			saveCustomer: function(customer, userId) {
				users.$child(userId).$child('customers').$add(customer);
			},
			getCustomersByUserId: function(userId) {
				return users.$child(userId).$child('customers');
			}
		};

		return customerServiceObject;
	})
	.factory ('textMessageService', function(dataService, customerService) {
			var textMessages = dataService.$child('textMessages');

			var textMessageServiceObject = {
				sendTextMessage: function(customer, userId) {
					var newTextMessage = {
						phoneNumber: customer.phone, 
						size: customer.size,
						name: customer.name
					};
					textMessages.$add(newTextMessage);
					customerService.getCustomersByUserId(userId).$child(customer.$id).$update({notified: 'Yes'});
				}
			};

			return textMessageServiceObject;
	})
	.factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL, dataService) {
		var authRef = new Firebase(FIREBASE_URL);
		var auth = $firebaseSimpleLogin(authRef);
		var emails = dataService.$child('emails');

		var authServiceObject = {
			register: function(user) {
				auth.$createUser(user.email, user.password).then(function(data) {
					console.log(data);
					authServiceObject.login(user, function() {
						emails.$add({email: user.email});
					});
				});
			},
			login: function(user, optionalCallback) {
				auth.$login('password', user).then(function(data) {
					console.log(data);
					if (optionalCallback) {
					optionalCallback();
					}
					$location.path('/waitlist');
				});				
			},
			logout: function() {
				auth.$logout();
				$location.path('/');
			},
			getCurrentUser: function() {
				return auth.$getCurrentUser();
			}
		};

		$rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
			$rootScope.currentUser = user;
		});

		$rootScope.$on("$firebaseSimpleLogin:logout", function() {
			$rootScope.currentUser = null;
		});

		return authServiceObject;
	});

