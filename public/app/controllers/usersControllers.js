angular.module('usersControllers', ['usersServices', 'selftempsServices'])
    .controller('usersCtrl', function(userServices, selfTemplateService, $scope, $location, $routeParams, $timeout) {

        function getAllUsers() {
            userServices.getAllUsers().then(function(data) {
                $scope.users = data.data;
            })
        }

        getAllUsers();

        function getSelfTemplatesData() {
            selfTemplateService.getAllSelfTemplates().then(function(data) {
                $scope.template = data.data[0];
                $scope.templateData = data.data;
            })
        }

        getSelfTemplatesData();

        $scope.createUser = function(userData) {
            userServices.createUser(this.userData).then(function(data) {
                $scope.clone = function() {
                    selfTemplateService.cloneSelfTemplate($scope.template);
                    var cloneObj = $scope.templateData.slice(-1)[0];
                    cloneObj.isCloned = true;
                    data.data.selftemplates = cloneObj._id;
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
                }
            })
        }

    });