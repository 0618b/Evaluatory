angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(SelfTemplate, $scope, $routeParams, $location) {
        
        var app = this;

        function refresh() {
           SelfTemplate.getSelfTemps().then(function(data) {
                $scope.selftemps = data;
                $scope.s2 = data.data[0].self_template;
           })
        }

        refresh();

        app.clone = function() {
            SelfTemplate.getSelfTemps().then(function(data) {
            var cloneObj = JSON.parse(JSON.stringify(data));
                SelfTemplate.clone(cloneObj.data[0]);
                    console.log(cloneObj.data.length+1);
                    console.log(cloneObj.data);
                })
            }

        app.delete = function(id) {
            SelfTemplate.delete(this.id);
            console.log('Success');
        }
    })

    .controller('stevalCtrl', function($scope, $routeParams, SelfTemplate) {

        SelfTemplate.getSelfTemp($routeParams).then(function(data) {
            $scope.selftemp = data;
                console.log($scope.selftemp);
        })
        


    })