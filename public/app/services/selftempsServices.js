angular.module('selftempsServices', [])
    .factory('SelfTemplate', function($http) {
        stFactory = {};

        stFactory.create = function(data) {
            return $http.post('/api/selftemps', data);
        };
        stFactory.getAll = function() {
            return $http.get('/api/selftemps/');
        };
        stFactory.getId = function(id) {
            return $http.get('/api/selftemps/' + id);
        };
        stFactory.edit = function(id) {
            return $http.put('/api/selftemps', id);
        };
        stFactory.delete = function(id) {
            return $http.delete('/api/selftemps/' + id);
        };
        return stFactory;
    });