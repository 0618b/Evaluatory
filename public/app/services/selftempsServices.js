angular.module('selftempsServices', [])
    .factory('selfTemplateService', function($http) {

        stFactory = {};

        // Clone template
        stFactory.cloneSelfTemplate = function(cloneObj) {
            return $http.post('/api/selftemps', cloneObj);
        };

        // Get All template
        stFactory.getAllSelfTemplates = function() {
            return $http.get('/api/selftemps/');
        };

        // Get Each Template
        stFactory.getEachSelfTemplates = function(id) {
            return $http.get('/api/selftempu/' + id);
        };

        // Get template by its id, then edit
        stFactory.getSelfTemplateById = function(id) {
            return $http.get('/api/selftemp/' + id);
        };

        // Edit a self-evaluation template
        stFactory.evalSelfTemplate = function(id, evalData) {
            return $http.put('/api/selftemp/' + id, evalData);
        };

        return stFactory; // Return Self-Template Factory Object

    });