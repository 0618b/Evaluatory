angular.module('mainRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {

        //AngularJS route handler
        $routeProvider
            .when('/home', {
                templateUrl: '/app/views/pages/homepage/home.html'
            })
            .when('/users', {
                templateUrl: '/app/views/pages/users/user.html'
            })
            .when('/logout', {
                templateUrl: '/app/views/pages/users/logout.html'
            })
            .when('/selftemps', {
                templateUrl: '/app/views/pages/evalforms/selftemp.html',
                controller: 'selftempsCtrl'
            })
            .when('/selftemps/:id', {
                templateUrl: '/app/views/pages/evalforms/st-eval.html',
                controller: 'selfevalCtrl'
            })
            .when('/othertemps', {
                templateUrl: '/app/views/pages/evalforms/othertemp.html'
            })
            .otherwise({
                redirectTo: '/home'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });