console.log('joder');

var doshApp = angular.module('doshApp', ['ngRoute', 'appControllers']);

var appControllers = angular.module('appControllers', []);

doshApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "assets/views/routes/home.html",
            controller: 'DoshaController'
        }).
        when('/register', {
            templateUrl: "assets/views/routes/register.html",
            controller: 'DoshaController'
        }).
        when('/history', {
            templateUrl: "assets/views/routes/history.html",
            controller: 'ResultsController'
        }).
        when('/quiz', {
            templateUrl: "assets/views/routes/quiz.html",
            controller: 'QuizController'
        }).
        when('/results', {
            templateUrl: "assets/views/routes/results.html",
            controller: 'ResultsController'
        }).
        when('/welcome', {
            templateUrl: "assets/views/routes/welcome.html",
            controller: 'DoshaController'
        }).
        when('/logout', {
            templateUrl: "assets/views/routes/logout.html",
            controller: 'DoshaController'
        }).
        otherwise({
            redirectTo: "/home"
        })
}]);