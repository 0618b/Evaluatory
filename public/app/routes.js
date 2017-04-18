angular.module('mainRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {

        //AngularJS route handler
        $routeProvider

        .when('/', {
            templateUrl: 'app/views/pages/homepage/home.html'
        })
        .when('/evalforms', {
            templateUrl: 'app/views/pages/evalforms/evalforms.html'
        })
        .when('/selftemps', {
            templateUrl: 'app/views/pages/evalforms/selftemp.html',
            controller: 'selftempsCtrl',
            controllerAs: 'stCtrl'
        })
        .when('/selftemps/:id', {
            templateUrl: 'app/views/pages/evalforms/st-eval.html',
            controller: 'selftempsCtrl',
            controllerAs: 'stCtrl'
        })
        .when('/othertemps', {
            templateUrl: 'app/views/pages/evalforms/othertemp.html'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});