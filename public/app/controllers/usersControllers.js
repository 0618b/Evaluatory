angular.module('usersControllers', ['usersServices'])
    .controller('usersCtrl', function(userServices, $scope, $location, $routeParams, $timeout) {

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
                    alert('สร้างผู้ใช้งานเรียบร้อยแล้ว');
                    $timeout(function() {
                        $location.url('/users')
                    }, 500);
                } else {
                    console.log('Error!');
                }
            })
        }

    });