angular.module('selftempsServices', [])
    .factory('selfTemplateService', function($http) {

        stFactory = {};

        stFactory.create = function(data) {
            return $http.post('/api/selftemps', data);
        };

        // Clone template
        stFactory.cloneSelfTemplate = function(cloneObj) {
            return $http.post('/api/selftemps', cloneObj);
        };

        // Get All template
        stFactory.getAllSelfTemplates = function() {
            return $http.get('/api/selftemps/');
        };

        // Get template by its id, then edit
        stFactory.getSelfTemplateById = function(id) {
            return $http.get('/api/selftemps/' + id);
        };

        // Edit a self-evaluation template
        stFactory.evalSelfTemplate = function(id) {
            return $http.put('/api/selftemps/' + id);
        };

        // Delete a self-evaluation template
        stFactory.deleteSelfTemplate = function(id) {
            return $http.delete('/api/selftemps/' + id);
        };

        return stFactory; // Return Self-Template Factory Object

    });