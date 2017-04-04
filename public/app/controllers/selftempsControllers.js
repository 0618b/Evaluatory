angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(SelfTemplate, $scope, $routeParams) {
        
        var app = this;

        function refresh() {
           SelfTemplate.getSelfTemps().then(function(data) {
                $scope.selftemps = data;
           })
        }

        refresh();

        app.clone = function() {
            SelfTemplate.getSelfTemps().then(function(data) {
            var cloneObj = (JSON.parse(JSON.stringify(data.data[0])));
                SelfTemplate.clone(cloneObj)
                if (cloneObj !== null){
                    console.log(cloneObj);
                } else {
                    console.log(err);
                }
            })
        }

        app.delete = function($routeParams) {
            SelfTemplate.delete($routeParams);
            console.log('Success');
        }
    })

    .controller('stevalCtrl', function($scope, $routeParams, SelfTemplate) {
        var app = this;

        SelfTemplate.getSelfTemp($routeParams.id).then(function(err, data) {
            $scope.selftemp = data;
                console.log($scope.selftemp);
        })
        


    })