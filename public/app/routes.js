angular.module('evalformsRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {

        $routeProvider
        .when('/', {
            templateUrl: 'app/views/pages/homepage/home.html' //change to home.html in the future
        })
        .when('/evalforms', {
            templateUrl: 'app/views/pages/evalforms/evalforms.html',
            /*controller: 'addCtrl',
            controllerAs: 'add'*/
        })
        .when('/addevalforms', {
            templateUrl: 'app/views/pages/evalforms/addevalforms.html',
            controller: 'addCtrl',
            controllerAs: 'add'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});