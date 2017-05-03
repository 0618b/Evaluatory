angular.module('mainControllers', ['authServices', 'ui.bootstrap'])
    .controller('mainCtrl', function(authServices, $scope, $location, $routeParams, $window, $interval, $timeout, $rootScope) {
        var app = this;
        $scope.loadme = false;

        var hideLogInModal = function() {
            $("#loginModal").modal('hide'); // Hide modal once criteria met
        };

        $rootScope.$on('$routeChangeStart', function() {
            //check if user is logged in
            if (authServices.isLoggedIn()) {
                $rootScope.showLoginButton = false;
                authServices.getUser().then(function(data) {
                    console.log(data);
                    $scope.loadme = true;
                });
                console.log('Logged in');
            } else {
                $rootScope.showLoginButton = true;
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
                    hideLogInModal();
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