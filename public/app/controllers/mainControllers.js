angular.module('mainControllers', ['authServices'])
    .controller('mainCtrl', function(authServices, $scope, $location, $routeParams, $timeout) {

        if (authServices.isLoggedIn()) {
            console.log('Logged In');
        } else {
            console.log('Not logged in')
        }

        $scope.doLogin = function(loginData) {
            authServices.login(this.loginData).then(function(data) {
                if (data.data.success === true) {
                    $location.url('/home');
                } else {
                    console.log('Error occured!');
                };
            });
        };

        $scope.doLogout = function() {
            authServices.logout();
            $location.url('/logout');
            $timeout(function() {
                $location.url('/home');
            }, 2000);
        };

    });