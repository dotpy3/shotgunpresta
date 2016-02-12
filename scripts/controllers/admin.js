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
		}, function() {
			event.ajaxAddingPresta = false;
		});
	};

	$scope.deleteShotgun = function(index, presta) {
		$http({
			method: 'DELETE',
			url: APP_URL + 'shotgun/' + presta.shotguns[index].id + '?key=' + key,
		}).then(function() {
			presta.shotguns.splice(index, 1);
		});
	};

	$scope.validateShotgun = function(index, presta) {
		$http({
			method: 'POST',
			url: APP_URL + 'shotgun/' + presta.shotguns[index].id + '?key=' + key,
		}).then(function() {
			presta.shotguns[index].status = 'V';
		});
	};

	$scope.editPresta = function(presta) {
		presta.modifying = true;
		presta.newName = presta.name;
		presta.newDescription = presta.description;
		presta.newSlots = presta.slots;
	};

	$scope.modifyEvent = function(event) {
		event.modifying = !event.modifying;
		event.newName = event.name;
		event.newDescription = event.description;
		event.newStart = event.start;
		event.newEnd = event.end;
	};

	$scope.updateEvent = function(event) {
		event.updating = true;
		$http({
			method: 'PUT',
			url: APP_URL + 'event/' + event.id,
			data: {
				name: event.newName,
				key: key,
				description: event.newDescription,
				start: event.newStart,
				end: event.newEnd
			}
		}).then(function() {
			event.name = event.newName;
			event.description = event.newDescription;
			event.start = event.newStart;
			event.end = event.newEnd;
			event.updating = false;
			event.modifying = false;
		}, function() {
			event.updating = false;
		});
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
			url: APP_URL + 'events' + (key ? '?key=' + key : ''),
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
