angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(SelfTemplate, $scope, $routeParams, $location) {
        
        var app = this;

        function refresh() {
           SelfTemplate.getSelfTemps().then(function(data) {
                $scope.selftemps = data;
           })
        }

        refresh();

        app.clone = function() {
            SelfTemplate.getSelfTemps().then(function(data) {
            $scope.cloneObj = (JSON.parse(JSON.stringify(data.data[0])));
                SelfTemplate.clone($scope.cloneObj);
                    if ($scope.cloneObj !== null){
                        console.log($scope.cloneObj._id);
                    } else {
                        console.log(err);
                    }
                })
            }

        app.delete = function(id) {
            SelfTemplate.delete(id);
            console.log('Success');
        }
    })

    .controller('stevalCtrl', function($scope, $routeParams, SelfTemplate) {
        var app = this;

        SelfTemplate.getSelfTemp($routeParams).then(function(err, data) {
            $scope.selftemp = data;
                console.log($scope.selftemp);
        })
        


    })