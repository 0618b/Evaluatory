angular.module('evalformsServices', [])
    .factory('EvalForm', function($http) {
        evalformFactory = {};

        evalformFactory.create = function(docs) {
            return $http.post('/api/evalforms', docs);
        };
        evalformFactory.getAll = function() {
            return $http.get('/api/evalforms');
        };
        evalformFactory.getId = function(id) {
            return $http.get('/api/evalforms' + id);
        };
        evalformFactory.edit = function(id) {
            return $http.put('/api/evalforms', id);
        };
        evalformFactory.delete = function(id) {
            return $http.delete('/api/evalforms/' + id);
        };
        return evalformFactory;
    });