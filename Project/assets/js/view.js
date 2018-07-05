var app = angular.module('myApp',[]);

app.config(function($routeProvider){
	$routeProvider
		.when("/",{
			templateUrl1:'views/login.html'
			controller:'mainController'
		});
}