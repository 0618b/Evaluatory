angular.module('othertempsServices', [])
    .factory('otherTemplateService', function($http) {

        otFactory = {};

        otFactory.createSubjectGroupOtherTemplate = function(id, otherTemp) {
            return $http.post('/api/othertemps/subjectGroup/' + id, otherTemp);
        };

        otFactory.createWorkGroupOtherTemplate = function(id, otherTemp) {
            return $http.post('/api/othertemps/workGroup/' + id, otherTemp);
        };

        otFactory.createClassGroupOtherTemplate = function(id, otherTemp) {
            return $http.post('/api/othertemps/classGroup/' + id, otherTemp);
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

        return otFactory; // Return Self-Template Factory Object

    });