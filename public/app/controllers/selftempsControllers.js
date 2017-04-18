angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(SelfTemplate, $scope, $location, $routeParams) {
        
        var app = this;

        function refresh() {
           SelfTemplate.getAllObject().then(function(data) {               
                $scope.template = data.data[0];
                $scope.temp = data.data;
           })
        }
        refresh();

        app.clone = function() {
            SelfTemplate.clone($scope.template);
            var cloneObj = $scope.temp.slice(-1)[0];
            //console.log(cloneObj._id);
            refresh();
                $location.url('/selftemps/' + cloneObj._id);
                    SelfTemplate.getObjectById($routeParams._id).then(function(data) {
                        console.log($routeParams._id);
                    })

        }
        


    })