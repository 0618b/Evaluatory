angular.module('othertempsControllers', ['othertempsServices', 'angular.filter'])
    .controller('othertempsCtrl', function(otherTemplateService, $scope, $location, $routeParams, $rootScope) {

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

                s0 = $scope.self_template.sectionGroup[0].choiceGroupList[0].choiceList[0].score;
                s1 = $scope.self_template.sectionGroup[0].choiceGroupList[0].choiceList[1].score;
                s2 = $scope.self_template.sectionGroup[0].choiceGroupList[0].choiceList[2].score;
                s3 = $scope.self_template.sectionGroup[0].choiceGroupList[0].choiceList[3].score;
                s4 = $scope.self_template.sectionGroup[0].choiceGroupList[0].choiceList[4].score;
                s5 = $scope.self_template.sectionGroup[0].choiceGroupList[1].choiceList[0].score;
                s6 = $scope.self_template.sectionGroup[0].choiceGroupList[1].choiceList[1].score;
                s7 = $scope.self_template.sectionGroup[0].choiceGroupList[1].choiceList[2].score;
                s8 = $scope.self_template.sectionGroup[0].choiceGroupList[2].choiceList[0].score;
                s9 = $scope.self_template.sectionGroup[0].choiceGroupList[2].choiceList[1].score;

                w0 = $scope.self_template.sectionGroup[0].choiceGroupList[0].choiceList[0].evalWeight;
                w1 = $scope.self_template.sectionGroup[0].choiceGroupList[0].choiceList[1].evalWeight;
                w2 = $scope.self_template.sectionGroup[0].choiceGroupList[0].choiceList[2].evalWeight;
                w3 = $scope.self_template.sectionGroup[0].choiceGroupList[0].choiceList[3].evalWeight;
                w4 = $scope.self_template.sectionGroup[0].choiceGroupList[0].choiceList[4].evalWeight;
                w5 = $scope.self_template.sectionGroup[0].choiceGroupList[1].choiceList[0].evalWeight;
                w6 = $scope.self_template.sectionGroup[0].choiceGroupList[1].choiceList[1].evalWeight;
                w7 = $scope.self_template.sectionGroup[0].choiceGroupList[1].choiceList[2].evalWeight;
                w8 = $scope.self_template.sectionGroup[0].choiceGroupList[2].choiceList[0].evalWeight;
                w9 = $scope.self_template.sectionGroup[0].choiceGroupList[2].choiceList[1].evalWeight;

                var score_arr = [s0, s1, s2, s2, s4, s5, s6, s7, s8, s9];
                var evalWeight_arr = [w0, w1, w2, w3, w4, w5, w6, w7, w8, w9];

                $scope.totalScore = 0;
                $scope.totalWeight = 0

                for (var i = 0; i < score_arr.length; i++) {
                    $scope.totalScore += score_arr[i];
                }

                for (var i = 0; i < evalWeight_arr.length; i++) {
                    $scope.totalWeight += evalWeight_arr[i];
                }

                data.data.totalScore === $scope.totalScore;

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
                "self_template": $scope.self_template
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