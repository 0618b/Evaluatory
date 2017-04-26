angular.module('usersControllers', ['usersServices'])
    .controller('usersCtrl', function(userServices, $scope, $location, $routeParams, $rootScope) {

        $scope.users = [];

        if ($location.url === '/users') {
            userServices.getAllUsers().then(function(response) {
                $scope.users = response.data;
            }).catch(function(err) {
                console.log(err);
            });
        }




    });