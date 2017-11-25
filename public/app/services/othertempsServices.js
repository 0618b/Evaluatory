angular.module('othertempsServices', [])
    .factory('otherTemplateService', function($http) {

        otFactory = {};

        // Get Subject Group User
        otFactory.getSubjectGroupUser = function() {
            return $http.get('/api/othertemps/subjectGroup');
        }

        // Get Work Group User
        otFactory.getWorkGroupUser = function() {
            return $http.get('/api/othertemps/workGroup');
        }

        // Get Class Group User
        otFactory.getClassGroupUser = function() {
            return $http.get('/api/othertemps/classGroup');
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