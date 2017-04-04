angular.module('selftempsServices', [])
    .factory('SelfTemplate', function($http) {
        stFactory = {};

        stFactory.create = function(data) {
            return $http.post('/api/selftemps', data);
        };
        stFactory.clone = function(cloneObj) {
            return $http.post('/api/selftemps', cloneObj);
        };
        stFactory.getSelfTemps = function() {
            return $http.get('/api/selftemps/');
        };
        stFactory.getSelfTemp = function(id) {
            return $http.get('/api/selftemps/' + id);
        };
        stFactory.edit = function(id) {
            return $http.put('/api/selftemps', id);
        };
        stFactory.delete = function(id) {
            return $http.delete('/api/selftemps/' + id);
        };
        stFactory.eval = function(id) {
            return $http.put('/api/selftemps', id);
        }
        return stFactory;
    });