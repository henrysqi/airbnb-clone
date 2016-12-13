angular.module('airapp').controller('searchCtrl', function($scope, mainService, $stateParams, $state){
	
	$scope.searchFor = function(location){
		$state.go('search',{id:location})
	}
	
	mainService.getListingsFromApi($stateParams.id).then(function(response){
		$scope.searchresults = response.search_results;
		console.log($scope.searchresults)
		
		$scope.metadata = response.metadata;
		console.log($scope.metadata);
	});
	
	/////////////////////////////////////////////// guests	
	
	$scope.guestfilter = function (item) {
    return $scope.guestnum <= item.pricing_quote.guests;
	};	
	
	//////////////////////////////////////////////// slider
	
  $scope.lower_price_bound = 10;
  $scope.upper_price_bound = 500;
  
  $scope.pricerange = function(item) {
    return (parseInt(item.pricing_quote.nightly_price) >= $scope.lower_price_bound && parseInt(item.pricing_quote.nightly_price) <= $scope.upper_price_bound);
  };
	
})