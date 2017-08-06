angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(selfTemplateService, $scope, $location, $routeParams, $rootScope, $timeout) {

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
                        }
                    })
                    /*var cloneObj = templateData.slice(-1)[0];
                    $location.url('/selftemps/' + cloneObj._id);
                    cloneObj.isCloned = true;
                    $routeParams.id = cloneObj._id;*/
            })
        }

        var openCreateSelfTempModal = function() {
            $("#createStModal").modal('show')
        }

        function getEachSelfTemplates() {
            selfTemplateService.getEachSelfTemplates().then(function(data) {
                $scope.selftemplateData = data.data;
                if (data.data.length < 1) openCreateSelfTempModal();
            });
        };

        getEachSelfTemplates();

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

    $scope.evalSelfTemp = function(parseData) {
        var parseData = { "self_template": this.self_template } // saving the eval data then parse as an object
        selfTemplateService.evalSelfTemplate($routeParams.id, parseData).then(function(response) {
            response.isEvaluated = true;
            console.log(response);
            swal({
                title: 'บันทึกผลการประเมินเรียบร้อยแล้ว',
                type: 'success',
                timer: 2000
            })
        });
    };

    $scope.viewScore = function() {
        $location.url('/selfscores/' + $routeParams.id);
    }
});