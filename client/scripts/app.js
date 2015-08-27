console.log('joder');

var doshApp = angular.module('doshApp', ['ngRoute', 'appControllers']);

var appControllers = angular.module('appControllers', []);

doshApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "assets/views/routes/home.html",
            controller: 'DoshaController'
        }).
        otherwise({
            redirectTo: "/home"
        })
}]);