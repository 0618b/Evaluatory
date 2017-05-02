angular.module('mainControllers', ['authServices'])
    .controller('mainCtrl', function(authServices, $scope, $location, $routeParams, $timeout, $rootScope) {

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

        if (authServices.isLoggedIn()) {
            $rootScope.showLoginButton = false;
            console.log('Logged in');
        } else {
            $rootScope.showLoginButton = true;
            console.log('Not logged in');
        }

    });