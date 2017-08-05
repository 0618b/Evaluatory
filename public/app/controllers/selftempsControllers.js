angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(selfTemplateService, $scope, $location, $routeParams, $rootScope, $timeout) {

        /*function getAllSelfTemplates() {
            selfTemplateService.getAllSelfTemplates().then(function(data) {
                $scope.template = data.data[0];
                $scope.templateData = data.data;
            });
        };

        getAllSelfTemplates(); //invoke function to get data from databases

        $scope.clone = function() {
            selfTemplateService.cloneSelfTemplate($scope.template); // Clone a template to create a new object
            var cloneObj = $scope.templateData.slice(-1)[0]; // Select the last element of database to use it as a cloned object
            $location.url('/selftemps/' + cloneObj._id); // redirect to the evaluation page with an id
            cloneObj.isCloned = true;
            $routeParams.id = cloneObj._id;
        };*/

        function getEachSelfTemplates() {
            selfTemplateService.getEachSelfTemplates().then(function(data) {
                console.log(data);
                if (!data) {
                    swal({
                        title: 'ยังไม่มีแบบประเมินเลย',
                        text: 'ต้องการเริ่มสร้างแบบประเมินหรือไม่ ?',
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#428bca',
                        cancelButtonColor: '#d9534f',
                        confirmButtonText: 'ใช่แล้ว',
                        cancelButtonText: 'ยังก่อน'
                    }).then(function() {
                        $scope.clone();
                        swal(
                            'สร้างแบบประเมินเรียบร้อยแล้ว',
                            'success'
                        )
                    })
                }
            });
        };

        getEachSelfTemplates();

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

    })

.controller('selfevalCtrl', function(selfTemplateService, $scope, $routeParams, $location) {

    selfTemplateService.getSelfTemplateById($routeParams.id).then(function(data) {
        if (data.data.success === true) { // check that data is OK
            $scope.data = JSON.parse(JSON.stringify(data)); //parse data into json strings to show in the system
            $scope.self_template = data.data.self_template;
        } else {
            swal({
                title: 'มีบางอย่างผิดพลาด',
                type: 'danger',
                timer: 2000
            })
        }
    });

    $scope.evalSelfTemp = function() {
        var parseData = { "self_template": this.self_template } // saving the eval data then parse as an object
        selfTemplateService.evalSelfTemplate($routeParams.id, parseData).then(function(response) {
            response.isEvaluated = true;
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