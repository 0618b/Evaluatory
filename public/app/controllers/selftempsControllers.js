angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(selfTemplateService, $scope, $location, $routeParams, $rootScope) {

        $scope.showCreateButton = true;

        $scope.clone = function() {
            selfTemplateService.getAllSelfTemplates().then(function(data) {
                var selftemplate = data.data[0];
                var templateData = data.data
                selfTemplateService.cloneSelfTemplate(selftemplate).then(function(data) {
                    if (data.data.success === false) {
                        swal({
                            title: 'มีบางอย่างผิดพลาด',
                            type: 'danger',
                            timer: 2000
                        })
                    } else {
                        swal({
                            title: 'สร้างแบบประเมินเรียบร้อยแล้ว',
                            type: 'success',
                            timer: 2000
                        })
                        var cloneObj = templateData.slice(-1)[0];
                        $location.url('/selftemp/' + cloneObj._id);
                    }
                })
            })
        }

        function getEachSelfTemplates() {
            selfTemplateService.getEachSelfTemplates().then(function(data) {
                $scope.selftemplateData = data.data;
            });
        };

        getEachSelfTemplates();

        // Function delete selftemp is deleted

    })

.controller('selfevalCtrl', function(selfTemplateService, $scope, $location, $routeParams, $rootScope, $timeout) {

    function getSelfTemplateById(id) {
        selfTemplateService.getSelfTemplateById($routeParams.id).then(function(data) {
            if (data.status === 200) { // check that data is OK
                $scope.data = JSON.parse(JSON.stringify(data)); //parse data into json strings to show in the system
                $scope.self_template = data.data.self_template;
            } else {
                swal({
                    title: 'มีบางอย่างผิดพลาด',
                    type: 'warning',
                    timer: 2000
                })
            }
        });
    }

    getSelfTemplateById();

    $scope.evalSelfTemp = function() {
        var evalData = {
                "self_template": $scope.self_template,
                "header": $scope.header
            } // saving the eval data then parse as an object
        selfTemplateService.evalSelfTemplate($routeParams.id, evalData).then(function(data) {
            swal({
                title: 'บันทึกผลการประเมินเรียบร้อยแล้ว',
                type: 'success',
                timer: 2000
            })
            $timeout(function() {
                $location.url('/selftemps')
            }, 500);
        });
    };

    $scope.viewScore = function() {
        $location.url('/selfscores/' + $routeParams.id);
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
}).filter('unique', function() {
    return function(collection, primaryKey) { //no need for secondary key
        var output = [],
            keys = [];
        var splitKeys = primaryKey.split('.'); //split by period

        angular.forEach(collection, function(item) {
            var key = {};
            angular.copy(item, key);
            for (var i = 0; i < splitKeys.length; i++) {
                key = key[splitKeys[i]]; //the beauty of loosely typed js :)
            }

            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});