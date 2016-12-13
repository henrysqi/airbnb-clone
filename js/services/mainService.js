angular.module('airapp').service('mainService', function($http, $q, $state, $stateParams){
	
	var baseUrl = "https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty"
		
	//////////////////////////////////////////////////////////// get all listings
	
	this.getListingsFromApi = function(name){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: baseUrl + "&location=" + name
		}).then(function(res){
			var listings = res.data;
			
			// show star rating
			var getStars = function(num){
				if (num === 0 || num === null){
					return "No rating";
				}
				num = Math.floor(num) - 1;
				var stars = ["★", "★★", "★★★", "★★★★", "★★★★★"]
				return stars[num];
			}			
			for (var i = 0; i < listings.search_results.length; i++){
				listings.search_results[i].listing.show_stars = getStars(listings.search_results[i].listing.star_rating);
				
				if (listings.search_results[i].listing.instant_bookable){
					listings.search_results[i].listing.instant_bookable = "isbookable"
				}
			}
			
			deferred.resolve(listings)
		})
		return deferred.promise;
	}
	
	this.getListings = function(){
		return listings;
	}
	
	/////////////////////////////////////////////////////////// indiv room

	this.getRoom = function(id){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'https://api.airbnb.com/v2/listings/' + id + '?client_id=3092nxybyb0otqw18e8nh5nty&_format=v1_legacy_for_p3'
		}).then(function(res){
			var room = res.data
			
			//stars
			var getStars = function(num){
				if (num === 0 || num === null){
					return "No rating";
				}
				num = Math.floor(num) - 1;
				var stars = ["★", "★★", "★★★", "★★★★", "★★★★★"]
				return stars[num];
			}			
			room.listing.show_stars = getStars(room.listing.star_rating);
			
			//check out
			function getCheckOutTime(num){
				if (num === null){
					return "N/A";
				} else if (num === 0){
					return "12 AM (midnight)";
				} else if (num < 12){
					return num + "AM";
				} else if (num === 12){
					return "12 PM (noon)"
				} else if (num < 24){
					return (num-12) + "PM";
				} else if (num === 24){
					return "12 AM (midnight)";
				} else {
					return "N/A";
				}
			}
			
			room.listing.actual_checkout_time = getCheckOutTime(room.listing.check_out_time)
							
			deferred.resolve(room);
		})
		return deferred.promise;
	}
	
})