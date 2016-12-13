angular.module('airapp').controller('roomCtrl', function($scope, mainService, $stateParams, $state){
	
	mainService.getRoom($stateParams.id).then(function(res){
		$scope.room = res;
		console.log($scope.room)
	})
	
	$scope.searchFor =function(location){
		$state.go('search',{id:location})
	}
	
	mainService.getListingsFromApi($stateParams.id).then(function(response){
		$scope.listings = response;
	});
	
})