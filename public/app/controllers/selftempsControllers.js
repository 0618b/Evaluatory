angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(selfTemplateService, $scope, $location, $routeParams) {

        function getAllSelfTemplates() {
            selfTemplateService.getAllSelfTemplates().then(function(data) {
                $scope.template = data.data[0];
                $scope.templateData = data.data;
            })
        }

        getAllSelfTemplates(); //invoke function to get data from databases

        $scope.clone = function() {
            selfTemplateService.cloneSelfTemplate($scope.template); // Clone a template to create a new object
            var cloneObj = $scope.templateData.slice(-1)[0]; // Select the last element of database to use it as a cloned object
            $location.url('/selftemps/' + cloneObj._id); // redirect to the evaluation page with an id
            $routeParams.id = cloneObj._id;
        }
    })

.controller('selfevalCtrl', function(selfTemplateService, $scope, $routeParams) {

    selfTemplateService.getSelfTemplateById($routeParams.id).then(function(data) {
        if (data.status === 200) { // check that data is OK
            $scope.data = JSON.parse(JSON.stringify(data)); //parse data into json strings
            //$scope.self_template = data.data.self_template;   
        } else {
            alert('Bad Request 400'); // catch the error
        }
    });

    $scope.evalSelfTemp = function() {
        var evalData = {
            "self_template": $scope.self_template
        }
        selfTemplateService.evalSelfTemplate($routeParams.id, evalData).then(function(data) {
            console.log(data.data);
        })
    }
});