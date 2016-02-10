angular.module('shotgunApp').controller('AdminCtrl', function($scope, $http, $routeParams, APP_URL) {
	var key = '';
	if ($routeParams.key) {
		key = $routeParams.key;
	}

	$scope.creatingEvent = false;
	$scope.createEvent = function() {
		$scope.creatingEvent = true;
		$http({
			method: 'POST',
			url: APP_URL + 'event',
			data: {
				description: $scope.newEvent.desc,
				name: $scope.newEvent.name,
				start: $scope.newEvent.start,
				end: $scope.newEvent.end,
				creator: 'Jo Colina',
			}
		}).then(function() {
			$scope.eventCreated = angular.copy($scope.newEvent);
			$scope.newEvent = {};
			$scope.getEvents();
			$scope.creatingEvent = false;
		}, function() {
			$scope.creatingEvent = false;
		});
	};

	$scope.addPresta = function(event) {
		event.ajaxAddingPresta = true;
		$http({
			method: 'POST',
			url: APP_URL + 'presta',
			data: {
				event_id: event.id,
				name: event.newPresta.name,
				description: event.newPresta.description || "",
				slots: event.newPresta.slots,
				creator: 'Jo Colina',
				type: 'presta',
			}
		}).then(function() {
			event.ajaxAddingPresta = false;
			event.addingPresta = false;
			event.prestas.push(event.newPresta);
			event.newPresta = {};
			console.log('ok');
		}, function() {
			console.log('hmm');
			event.ajaxAddingPresta = false;
		});
	};

	$scope.editPresta = function(presta) {
		presta.modifying = true;
		presta.newName = presta.name;
		presta.newDescription = presta.description;
		presta.newSlots = presta.slots;
	};

	$scope.updatePresta = function(presta) {
		presta.updating = true;
		$http({
			method: 'PUT',
			url: APP_URL + 'presta/' + presta.id,
			data: {
				key: key,
				name: presta.newName,
				description: presta.newDescription,
				type: presta.type,
				slots: presta.newSlots,
			}
		}).then(function(){
			presta.name = presta.newName;
			presta.description = presta.newDescription;
			presta.slots = presta.newSlots;
			presta.modifying = false;
			presta.updating = false;
		}, function() {
			presta.updating = false;
		});
	};

	$scope.closeNewEventAlert = function() {
		$scope.eventCreated = null;
	};

	$scope.getEvents = function() {
		$http({
			method: 'GET',
			url: APP_URL + 'events',
		}).then(function(data){
			$scope.events = data.data;
		}, function() {
			$scope.connectionError = true;
		});
	};

	$scope.init = function() {
		$scope.getEvents();
	};

	$scope.init();

});
