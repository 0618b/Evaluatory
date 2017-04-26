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
            $location.url('/selftemps/' + cloneObj._id);
            $routeParams.id = cloneObj._id;
        }
    })

.controller('selfevalCtrl', function(selfTemplateService, $scope, $routeParams) {

    selfTemplateService.getSelfTemplateById($routeParams.id).then(function(data) {
        if (data.status === 200) {
            $scope.data = JSON.parse(JSON.stringify(data));
            $scope.self_template = data.data.self_template;
            $scope.currentSelfTemp = data.data._id;
        } else {
            alert('Bad Request 400');
        }
    });

    $scope.eval = function(selftemp) {
        console.log(selftemp);
        if (selftemp != null) {
            selfTemplateService.evalSelfTemplate($routeParams.id, selftemp).then(function(response) {
                if (response.data === "Updated!") {
                    console.log('Yay!');
                } else {
                    console.log('Error1');
                }
            });
        } else {
            console.log('Error2');
        }
    }
});