angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(selfTemplateService, $scope, $location, $routeParams, $rootScope, $timeout) {

        $scope.testFlag = false;

        function getAllSelfTemplates() {
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
            $scope.testFlag = true;
        };
    })

.controller('selfevalCtrl', function(selfTemplateService, $scope, $routeParams, $location) {

    selfTemplateService.getSelfTemplateById($routeParams.id).then(function(data) {
        if (data.status === 200) { // check that data is OK
            $scope.data = JSON.parse(JSON.stringify(data)); //parse data into json strings to show in the system
            $scope.self_template = data.data.self_template;
            console.log(data);
        } else {
            alert('Bad Request 400'); // catch the error
        }
    });

    $scope.evalSelfTemp = function() {
        var parseData = { "self_template": this.self_template } // saving the eval data then parse as an object
        selfTemplateService.evalSelfTemplate($routeParams.id, parseData).then(function(response) {
            console.log(response.data.self_template.sectionGroup[0].choiceGroupList[0].choiceList[0]);
            $scope.isEvaluated = true;
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