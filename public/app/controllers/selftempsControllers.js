angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(SelfTemplate, $scope, $routeParams) {
        
        var app = this;

        function getSelfTemps() {
           SelfTemplate.getSelfTemps().then(function(data) {
                $scope.selftemps = data;
                    console.log($scope.selftemps);
           })
        }

        getSelfTemps();

        app.clone = function() {
            var cloneObj = JSON.parse(JSON.stringify($scope.selftemps.data));
                SelfTemplate.clone(cloneObj);
                   console.log(cloneObj);
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