angular.module('airapp').directive('mapDirective', function(){

	return {
		restrict: 'EA',
		templateUrl: 'views/map.html',
		controller: function($scope){

			var locations = [];
      var map;

      function initMap() {

				for (var i = 0; i < $scope.listingdata.length; i++){
					var coordinates = [
						$scope.listingdata[i].listing.neighborhood,
						$scope.listingdata[i].listing.lat,
						$scope.listingdata[i].listing.lng,
						$scope.listingdata[i].pricing_quote.nightly_price,
						$scope.listingdata[i].listing.picture_url,
						$scope.listingdata[i].listing.name,
						$scope.listingdata[i].listing.room_type,
						$scope.listingdata[i].listing.show_stars,
						$scope.listingdata[i].listing.reviews_count,
						$scope.listingdata[i].listing.user.picture_url,
						$scope.listingdata[i].listing.id
					]
					locations.push(coordinates)
				}

        var map = new google.maps.Map(document.getElementById('map'), {
					zoom: 12,
//					center: new google.maps.LatLng(-33.92, 151.25),
					center: new google.maps.LatLng($scope.geodata.geography.lat, $scope.geodata.geography.lng),
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});

				console.log(locations)

				function idInQuotes(index){
					return "\'" + locations[index][10] + "\'";
				}

				function getInfoWindowContent(index){
					var result =
						'<a ui-sref="room({id: ' + idInQuotes(index) + '})"' + 'href="#/room/' + locations[index][10] +'">' + '<img class="info-window-img" src=' + locations[index][4] + '>' + '</a>' +
						'<figcaption>' + locations[index][5] + '</figcaption>' +
						'<figcaption>' + locations[index][6] + ' &bull; <span class="stars">'+ locations[index][7] + '</span> &bull; ' + locations[index][8] + ' reviews</figcaption>';
					return result;
				}

				function attachInfoWindowContent(marker, content){
					var infowindow = new google.maps.InfoWindow({
						content: content
					});
					marker.addListener('click', function() {
          	infowindow.open(marker.get('map'), marker);
        	});
				}

				for (var i = 0; i < locations.length; i++) {
				  var marker = new google.maps.Marker({
						position: new google.maps.LatLng(locations[i][1], locations[i][2]),
						map: map,
						icon: 'assets/images/airmarker.png',
						label: {
							text: "$" + locations[i][3],
							color: 'white',
							fontWeight: 'bold'
						}
					});
					attachInfoWindowContent(marker, getInfoWindowContent(i));
				}

      }

			function loadScript(url, callback){

					var script = document.createElement("script")
					script.type = "text/javascript";

					if (script.readyState){  //IE
							script.onreadystatechange = function(){
									if (script.readyState == "loaded" ||
													script.readyState == "complete"){
											script.onreadystatechange = null;
											callback();
									}
							};
					} else {  //Others
							script.onload = function(){
									callback();
							};
					}

					script.src = url;
					document.getElementsByTagName("head")[0].appendChild(script);
			}

			loadScript("insert key here", initMap);

		},

		scope: {
			geodata: "=",
			listingdata: "="
		}
	}

})
