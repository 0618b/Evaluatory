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

        $scope.deleteUser = function(id) {
            userServices.deleteUser(id).then(function(data) {
                getAllUsers();
                console.log('Success');
            })
        }

        $scope.isNotAdmin = function(data) {
            return data.permission != "admin";
        }

    }).controller('userEvalCtrl', function(userServices, $scope, $location, $routeParams, $timeout) {

        function getEvalUsers() {
            userServices.getEvalUsers().then(function(data) {
                $scope.userEval = data.data;
                console.log(data.data);
                var present = new Date();
                var month = present.getMonth() + 1;
                var year = present.getFullYear() + 543;
                $scope.evalRound = "";
                if (month >= 10 && month <= 12 || month >= 1 && month <= 3) {
                    $scope.evalRound = 1 + "/" + year;
                } else if (month >= 4 && month <= 9) {
                    $scope.evalRound = 2 + "/" + year;
                }
            })
        }

        $scope.isNotAdmin = function(data) {
            return data.permission != "admin";
        }

        getEvalUsers();

    }).directive('ngReallyClick', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    var message = attrs.ngReallyMessage;
                    if (message && confirm(message)) {
                        scope.$apply(attrs.ngReallyClick);
                    }
                });
            }
        }
    }]);