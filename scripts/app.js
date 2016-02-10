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
				if (response.data){
					message.error(response.data.error.message || response.data.error.code || 'Une erreur est survenue.');
				} else {
					message.error('Impossible de se connecter au serveur.');
				}
				return $q.reject(response);
			}
		}
	})
});
