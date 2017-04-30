angular.module('usersControllers', ['usersServices'])
    .controller('usersCtrl', function(userServices, $scope, $location, $routeParams) {

        var app = this;

        function getAllUsers() {
            userServices.getAllUsers().then(function(data) {
                $scope.users = data.data;
            })
        }

        getAllUsers();

        $scope.create = function(userData) {
            userServices.createUser(app.userData).then(function(data) {
                if (data.data.success) {
                    $scope.alert = 'alert alert-success';
                    app.successMsg = data.data.msg;
                } else {
                    $scope.alert = 'alert alert-danger';
                    app.errorMsg = data.data.msg;
                }
            })
        }

    });