angular.module('othertempsControllers', ['othertempsServices', 'angular.filter'])
    .controller('othertempsCtrl', function(otherTemplateService, $scope, $location, $routeParams, $rootScope, $timeout) {

        $scope.createOtherTemplate = function(otherTemp) {
            otherTemplateService.createOtherTemplate($routeParams.id, otherTemp).then(function(data) {
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

.controller('subjectGroupCtrl', function(otherTemplateService, $scope) {

    $scope.isNotAdmin = function(data) {
        return data.permission != "admin";
    }

    function getSubjectGroupUsers() {
        otherTemplateService.getSubjectGroupUsers().then(function(data) {
            $scope.othertemplateData = data.data;
            console.log($scope.othertemplateData);
        });
    };
    getSubjectGroupUsers();
})


.controller('classGroupCtrl', function(otherTemplateService, $scope) {

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
})

.controller('workGroupCtrl', function(otherTemplateService, $scope) {

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
})

.controller('otherevalCtrl', function(otherTemplateService, $scope, $location, $routeParams, $rootScope, $timeout) {

    function getOtherTemplateById(id) {
        otherTemplateService.getOtherTemplateById($routeParams.id).then(function(data) {
            if (data.status === 200) { // check that data is OK
                $scope.data = JSON.parse(JSON.stringify(data)); //parse data into json strings to show in the system
                $scope.other_template = data.data;
            } else {
                swal({
                    title: 'มีบางอย่างผิดพลาด',
                    type: 'warning',
                    timer: 2000
                })
            }
        });
    }

    getOtherTemplateById();

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