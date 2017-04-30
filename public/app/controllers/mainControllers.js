angular.module('mainControllers', ['authServices'])
    .controller('mainCtrl', function(authServices, $scope, $location, $routeParams) {

        $scope.doLogin = function(loginData) {
            authServices.login(this.loginData).then(function(data) {
                console.log(data);
            })
        }
    });