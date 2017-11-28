angular.module('usersControllers', ['usersServices', 'selftempsServices'])
    .controller('usersCtrl', function(userServices, $scope, $location, $routeParams, $timeout) {

        function getAllUsers() {
            userServices.getAllUsers().then(function(data) {
                $scope.users = data.data;
                console.log(data.data);
            })
        }

        getAllUsers();

        $scope.createUser = function(userData) {
            userServices.createUser(this.userData).then(function(data) {
                if (data.data.success === true) {
                    $scope.msg = data.data.msg;
                    swal({
                        title: $scope.msg,
                        type: 'success',
                        timer: 2000
                    })
                    $timeout(function() {
                        $location.url('/users')
                    }, 500);
                } else {
                    $scope.msg = data.data.msg;
                    swal({
                        title: $scope.msg,
                        type: 'error',
                        timer: 2000
                    })
                }

            })
        }
    }).controller('userEvalCtrl', function(userServices, $scope, $location, $routeParams, $timeout) {

        function getEvalUsers() {
            userServices.getEvalUsers().then(function(data) {
                $scope.userEval = data.data;
                console.log(data.data);
            })
        }
    })