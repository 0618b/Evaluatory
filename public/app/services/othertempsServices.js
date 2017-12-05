angular.module('othertempsServices', [])
    .factory('otherTemplateService', function($http) {

        otFactory = {};

        otFactory.createOtherTemplate = function(id, otherTemp) {
            return $http.post('/api/othertemps/' + id, otherTemp);
        };

        // Get Subject Group User
        otFactory.getSubjectGroupUsers = function() {
            return $http.get('/api/othertemps/subjectGroup');
        }

        otFactory.getClassGroupUsers = function() {
            return $http.get('/api/othertemps/classGroup');
        }

        otFactory.getWorkGroupUsers = function() {
            return $http.get('/api/othertemps/workGroup');
        }

        // Get Each Template
        otFactory.getEachOtherTemplates = function(id) {
            return $http.get('/api/othertempu/' + id);
        };

        // Get template by its id, then edit
        otFactory.getOtherTemplateById = function(id) {
            return $http.get('/api/othertemp/' + id);
        };

        // Edit a self-evaluation template
        otFactory.evalOtherTemplate = function(id, evalData) {
            return $http.put('/api/othertemp/' + id, evalData);
        };

        return otFactory; // Return Self-Template Factory Object

    });