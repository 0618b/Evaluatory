angular.module('authServices', [])
    .factory('authServices', function($http) {

        authFactory = {};

        authFactory.login = function(loginData) {
            return $http.post('/api/authenticate', loginData);
        };

        return authFactory;

    });