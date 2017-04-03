angular.module('selftempsControllers', ['selftempsServices'])
    .controller('selftempsCtrl', function(SelfTemplate, $scope) {
        
        function getAll() {
           SelfTemplate.getAll().then(function(data) {
                $scope.selftemps = data;
                console.log(data);
            })
        }

        getAll();

        this.edit = function(id) {
            console.log(id);
            $http.get('/selftemps' + id).then(function(data) {
                $scope.self_template = data;
            })
        }

        this.update = function(id) {
            console.log($scope.self_template._id);
            $http.put('/selftemps/' + $scope.self_template._id, $scope.self_template).then(function(data) {
                refresh();
            })
        }

    });    