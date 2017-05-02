angular.module('mainControllers', ['authServices'])
    .controller('mainCtrl', function(authServices, $scope, $location, $routeParams, $timeout, $rootScope) {

        $scope.doLogout = function() {
            authServices.logout();
            $location.url('/logout');
            $timeout(function() {
                $location.url('/home');
            }, 2000)
        };

        $scope.doLogin = function(loginData) {
            authServices.login(this.loginData).then(function(data) {
                if (data.data.success === true) {
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
            $scope.showLoginButton = false;
            console.log('Logged in');
        } else {
            $scope.showLoginButton = true;
            console.log('Not logged in');
        }

    });