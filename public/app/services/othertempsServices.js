angular.module('othertempsServices', [])
    .factory('otherTemplateService', function($http) {

        otFactory = {};

        // Clone template
        stFactory.cloneOtherTemplate = function(cloneObj) {
            return $http.post('/api/othertemps', cloneObj);
        };

        // Get All template
        stFactory.getAllOtherTemplates = function() {
            return $http.get('/api/othertemps/');
        };

        // Get Each Template
        stFactory.getEachOtherTemplates = function(id) {
            return $http.get('/api/othertempu/' + id);
        };

        // Get template by its id, then edit
        stFactory.getOtherTemplateById = function(id) {
            return $http.get('/api/othertemp/' + id);
        };

        // Edit a self-evaluation template
        stFactory.evalOtherTemplate = function(id, evalData) {
            return $http.put('/api/othertemp/' + id, evalData);
        };

        return otFactory; // Return Self-Template Factory Object

    });