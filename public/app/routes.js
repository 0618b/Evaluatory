var app = angular.module('mainRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {

        //AngularJS route handler
        $routeProvider
            .when('/', {
                templateUrl: '/app/views/pages/homepage/home.html'
            })
            .when('/home', {
                templateUrl: '/app/views/pages/homepage/home.html'
            })
            .when('/users', {
                templateUrl: '/app/views/pages/users/user.html',
                authenticated: true
            })
            .when('/logout', {
                templateUrl: '/app/views/pages/users/logout.html'
            })
            .when('/selftemps', {
                templateUrl: '/app/views/pages/evalforms/selftemp.html',
                controller: 'selftempsCtrl',
                authenticated: true
            })
            .when('/selftemps/:id', {
                templateUrl: '/app/views/pages/evalforms/st-eval.html',
                controller: 'selfevalCtrl',
                authenticated: true
            })
            .when('/othertemps', {
                templateUrl: '/app/views/pages/evalforms/othertemp.html',
                authenticated: true
            })
            .when('/404', {
                templateUrl: '/app/views/pages/errors/404.html'
            })
            .otherwise({
                redirectTo: '/404'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    });

app.run(['$rootScope', 'authServices', '$location', 'userServices', function($rootScope, authServices, $location, userServices) {
    // Check each time route changes    
    $rootScope.$on('$routeChangeStart', function(event, next, current) {

        // Only perform if user visited a route listed above
        if (next.$$route !== undefined) {
            // Check if authentication is required on route
            if (next.$$route.authenticated === true) {
                // Check if authentication is required, then if permission is required
                if (!authServices.isLoggedIn()) {
                    event.preventDefault(); // If not logged in, prevent accessing route
                    $location.url('/home'); // Redirect to home instead
                    $rootScope.alert = 'กรุณาเข้าสู่ระบบก่อนค่ะ';
                    alert($rootScope.alert);
                } else if (next.$$route.authenticated === false) {
                    // If authentication is not required, make sure is not logged in
                    if (Auth.isLoggedIn()) {
                        event.preventDefault(); // If user is logged in, prevent accessing route
                        $location.path('/profile'); // Redirect to profile instead
                    }
                }
            }
        }

    });
}])