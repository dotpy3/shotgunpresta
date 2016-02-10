'use strict';

angular.module('shotgunApp', [
	'ngRoute',
	'ui.bootstrap',
]).config(function($routeProvider, $httpProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl',
		reloadOnSearch: false,
	}).when('/admin', {
		templateUrl: 'views/admin.html',
		controller: 'AdminCtrl',
		reloadOnSearch: false,
	});

	$httpProvider.interceptors.push(function($q, message) {
		return {
			responseError: function(response) {
				message.error(response.data.error.message || 'Une erreur est survenue.');
				return $q.reject(response);
			}
		}
	})
});
