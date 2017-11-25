var app = angular.module('mainRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {

        //AngularJS route handler
        $routeProvider
            .when('/', {
                templateUrl: '/app/views/pages/homepage/home.html'
            })
            .when('/home', {
                templateUrl: '/app/views/pages/homepage/home.html',
                controller: 'mainCtrl'
            })
            .when('/users', {
                templateUrl: '/app/views/pages/users/users.html',
                authenticated: true,
                permission: ['admin']
            })
            .when('/addUser', {
                templateUrl: '/app/views/pages/users/adduser.html',
                authenticated: true,
                permission: ['admin']
            })
            .when('/selftemps', {
                templateUrl: '/app/views/pages/evalforms/selftemp.html',
                controller: 'selftempsCtrl',
                authenticated: true
            })
            .when('/selftemp/:id', {
                templateUrl: '/app/views/pages/evalforms/selfeval.html',
                controller: 'selfevalCtrl',
                authenticated: true
            })
            .when('/othertemps/subjectGroup', {
                templateUrl: '/app/views/pages/evalforms/othertemp_subjectGroup.html',
                authenticated: true
            })
            .when('/othertemps/workGroup', {
                templateUrl: '/app/views/pages/evalforms/othertemp_workGroup.html',
                authenticated: true
            })
            .when('/othertemps/classGroup', {
                templateUrl: '/app/views/pages/evalforms/othertemp_classGroup.html',
                authenticated: true
            })
            .when('/othertemp/test', {
                templateUrl: '/app/views/pages/evalforms/othertempeval.html',
                controller: 'selfevalCtrl',
                authenticated: true
            })
            .when('/selfscores/:id', {
                templateUrl: '/app/views/pages/evalforms/selfscores.html',
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
                    swal({
                        title: 'กรุณาเข้าสู่ระบบก่อน',
                        type: 'error',
                        timer: 2000
                    })
                } else if (next.$$route.permission) {
                    // function: get current user permission to see if authorized on route
                    userServices.getPermission().then(function(data) {
                        // Check if user's permission matches at least one in the array
                        if (next.$$route.permission[0] !== data.data.permission) {
                            if (next.$$route.permission[1] !== data.data.permission) {
                                event.preventDefault(); // If at least one role does not match, prevent accessing route
                                $location.url('/home'); // Redirect to home instead
                                swal({
                                    title: 'คุณไม่มีสิทธิ์เข้าใช้งานในส่วนนี้ โปรดติดต่อผู้ดูแลระบบ',
                                    type: 'error',
                                    timer: 2000
                                })
                            }
                        }
                    });
                } else if (next.$$route.authenticated === false) {
                    // If authentication is not required, make sure is not logged in
                    if (Auth.isLoggedIn()) {
                        event.preventDefault(); // If user is logged in, prevent accessing route
                        $location.url('/home'); // Redirect to profile instead
                    }
                }
            }
        }

    });
}])