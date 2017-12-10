angular.module('othertempsControllers', ['othertempsServices', 'angular.filter'])
    .controller('subjectGroupCtrl', function(otherTemplateService, $scope, $location, $routeParams, $timeout) {

        $scope.isNotAdmin = function(data) {
            return data.permission != "admin";
        }

        function getSubjectGroupUsers() {
            otherTemplateService.getSubjectGroupUsers().then(function(data) {
                $scope.othertemplateData = data.data;
            });
        };

        getSubjectGroupUsers();

        $scope.createSubjectGroupOtherTemplate = function(otherTemp) {
            otherTemplateService.createSubjectGroupOtherTemplate($routeParams.id, otherTemp).then(function(data) {
                if (data.data.success === true) {
                    let msg = data.data.msg;
                    swal({
                        title: msg,
                        type: 'success',
                        timer: 2000
                    })
                    $timeout(function() {
                        $location.url('/othertemps/subjectGroup')
                    }, 500);
                } else {
                    let msg = data.data.msg;
                    swal({
                        title: msg,
                        type: 'error',
                        timer: 2000
                    })
                }
            })
        }
    })


.controller('classGroupCtrl', function(otherTemplateService, $scope, $location, $routeParams, $timeout) {

    $scope.isNotAdmin = function(data) {
        return data.permission != "admin";
    }

    function getClassGroupUsers() {
        otherTemplateService.getClassGroupUsers().then(function(data) {
            $scope.othertemplateData = data.data;
            console.log($scope.othertemplateData);
        });
    };

    getClassGroupUsers();

    $scope.createClassGroupOtherTemplate = function(otherTemp) {
        otherTemplateService.createClassGroupOtherTemplate($routeParams.id, otherTemp).then(function(data) {
            if (data.data.success === true) {
                let msg = data.data.msg;
                swal({
                    title: msg,
                    type: 'success',
                    timer: 2000
                })
                $timeout(function() {
                    $location.url('/othertemps/classGroup')
                }, 500);
            } else {
                let msg = data.data.msg;
                swal({
                    title: msg,
                    type: 'error',
                    timer: 2000
                })
            }
        })
    }
})

.controller('workGroupCtrl', function(otherTemplateService, $scope, $location, $routeParams, $timeout) {

    $scope.isNotAdmin = function(data) {
        return data.permission != "admin";
    }

    function getWorkGroupUsers() {
        otherTemplateService.getWorkGroupUsers().then(function(data) {
            $scope.othertemplateData = data.data;
            console.log($scope.othertemplateData);
        });
    };

    getWorkGroupUsers();

    $scope.createWorkGroupOtherTemplate = function(otherTemp) {
        otherTemplateService.createWorkGroupOtherTemplate($routeParams.id, otherTemp).then(function(data) {
            if (data.data.success === true) {
                let msg = data.data.msg;
                swal({
                    title: msg,
                    type: 'success',
                    timer: 2000
                })
                $timeout(function() {
                    $location.url('/othertemps/workGroup')
                }, 500);
            } else {
                let msg = data.data.msg;
                swal({
                    title: msg,
                    type: 'error',
                    timer: 2000
                })
            }
        })
    }
}).directive('convertToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(val) {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function(val) {
                return '' + val;
            });
        }
    };
});