angular.module('airapp', ['ui.router', 'uiSlider']).config(function($urlRouterProvider, $stateProvider){
	
	$urlRouterProvider
		.otherwise('/');
	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: "views/home.html",
			controller: "homeCtrl"
	})
		.state('search', {
			url: '/search/:id',
			templateUrl: 'views/search.html',
			controller: 'searchCtrl'
	})
		.state('room', {
			url: '/room/:id',
			templateUrl: 'views/room.html',
			controller: 'roomCtrl'
	});
	
	
})