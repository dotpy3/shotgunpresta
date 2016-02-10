angular.module('shotgunApp').controller('MainCtrl', function($scope, $http, APP_URL, message) {

	$scope.shotgun = function(presta) {
		$http({
			method: 'POST',
			url: APP_URL + 'presta/' + presta.id + '/shotgun',
			data: {
				mail: presta.shotgunMail,
				name: presta.shotgunName,
			}
		}).then(function() {
			presta.shotgunLaunched = false;
			presta.shotgunInitiated = false;
			message.success('Vous êtes inscrit à la presta ' + presta.name + ' !');
		}, function() {
			presta.shotgunLaunched = false;
		})
	}

	$scope.getEvents = function() {
		$http({
			method: 'GET',
			url: APP_URL + 'events'
		}).then(function(data){
			$scope.events = data.data;
		});
	};

	$scope.init = function() {
		$scope.getEvents();
	};

	$scope.initiateShotgun = function(presta) {
		presta.shotgunInitiated = true;
	};

	$scope.launchShotgun = function(presta) {
		presta.shotgunLaunched = true;
		$scope.shotgun(presta);
	};

	$scope.init();
});
