angular.module('mainControllers', ['authServices', 'ui.bootstrap'])
    .controller('mainCtrl', function(authServices, $scope, $location, $routeParams, $timeout, $rootScope) {

        $scope.loadme = false;

        $rootScope.$on('$routeChangeStart', function() {
            if (authServices.isLoggedIn()) {
                $scope.showLoginButton = false;
                authServices.getUser().then(function(data) {
                    console.log(data);
                    $scope.loadme = true;
                });
                console.log('Logged in');
            } else {
                $scope.showLoginButton = true;
                $scope.loadme = false;
                console.log('Not logged in');
            }
        });

        $scope.doLogout = function() {
            $rootScope.showLoginButton = true;
            authServices.logout();
            $location.url('/logout');
            $timeout(function() {
                $location.url('/home');
            }, 2000)
        };

        $scope.doLogin = function(loginData) {
            authServices.login(this.loginData).then(function(data) {
                if (data.data.success === true) {
                    $rootScope.showLoginButton = false;
                    $scope.msg = data.data.msg;
                    alert($scope.msg);
                    $timeout(function() {
                        $location.url('/home');
                    }, 2000)
                } else {
                    $scope.msg = data.data.msg;
                    alert($scope.msg);
                };
            });
        };
    });