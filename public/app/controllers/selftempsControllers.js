angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(SelfTemplateService, $scope, $location, $routeParams) {

        var app = this;        

        function getAllSelfTemplates() {
           SelfTemplateService.getAllSelfTemplates().then(function(data) {               
                $scope.template = data.data[0];
                $scope.templateData = data.data;
           })
        }

        getAllSelfTemplates(); //invoke function to get data from databases

        app.clone = function() {
            SelfTemplateService.cloneSelfTemplate($scope.template); // Clone a template to create a new object
            var cloneObj = $scope.templateData.slice(-1)[0]; // Select the last element of database to use it as a cloned object
                $location.url('/selftemps/' + cloneObj._id);
                $routeParams.id = cloneObj._id;
        }
    })

    .controller('selfevalCtrl', function(SelfTemplateService, $scope, $routeParams) {

        var app = this;

        SelfTemplateService.getSelfTemplateById($routeParams.id).then(function(data) {
            if (data.status === 200) {
                $scope.data = JSON.parse(JSON.stringify(data));
                $scope.self_template = data.data.self_template;
                app.currentSelfTemp = data.data._id;
            } else {
                alert('Bad Request 400');
            }
        });

        app.eval = function() {
            console.log(data);
            if(data != null){
                var obj = {};
                obj._id = app.currentSelfTemp;
                obj.self_template = $scope.self_template;
                    SelfTemplateService.evalSelfTemplate(obj).then(function(data) {
                        console.log('Yay!');
                    });
                } else {
                    console.log('Error!');
                }
            }
    });