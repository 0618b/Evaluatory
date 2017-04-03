angular.module('mainRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {

        $routeProvider
        .when('/', {
            templateUrl: 'app/views/pages/homepage/home.html'
        })
        .when('/evalforms', {
            templateUrl: 'app/views/pages/evalforms/evalforms.html'
        })
        .when('/selfevals', {
            templateUrl: 'app/views/pages/evalforms/selfeval.html'
        })
        .when('/otherevals', {
            templateUrl: 'app/views/pages/evalforms/othereval.html'
        })
        /*.when('/addevalforms', {
            templateUrl: 'app/views/pages/evalforms/addevalforms.html',
            controller: 'addCtrl',
            controllerAs: 'add'
        })*/
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});