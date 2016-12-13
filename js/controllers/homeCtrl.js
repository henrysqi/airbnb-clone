angular.module('airapp').controller('homeCtrl', function($scope, mainService, $stateParams, $state){
	
	$scope.searchFor =function(location){
		$state.go('search',{id:location})
	}
	
	mainService.getListingsFromApi($stateParams.id).then(function(response){
		$scope.listings = response;
	});
	
})