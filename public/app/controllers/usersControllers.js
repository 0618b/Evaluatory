angular.module('usersControllers', ['usersServices'])
    .controller('usersCtrl', function(userServices, $scope, $location, $routeParams) {

        function getAllUsers() {
            userServices.getAllUsers().then(function(data) {
                $scope.users = data.data;
                console.log(data);
            })
        }

        getAllUsers();

        $scope.createUser = function(userData) {
            userServices.createUser(this.userData).then(function(response) {
                if (response.status === 200) {
                    console.log(response);
                } else {
                    console.log('Error!');
                }
            })
        }

    });