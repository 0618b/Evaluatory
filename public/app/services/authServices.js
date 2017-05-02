angular.module('authServices', [])
    .factory('authServices', function($http, authToken) {

        authFactory = {};

        authFactory.login = function(loginData) {
            return $http.post('/api/authenticate', loginData).then(function(data) {
                authToken.setToken(data.data.token);
                return data;
            })
        };

        authFactory.isLoggedIn = function() {
            if (authToken.getToken()) {
                return true;
            } else {
                return false;
            }
        }

        authFactory.logout = function() {
            authToken.setToken();
        };

        return authFactory;

    })

.factory('authToken', function($window) {
    var authTokenFactory = {};

    authTokenFactory.setToken = function(token) {
        if (token) {
            $window.localStorage.setItem('token', token);
        } else {
            $window.localStorage.removeItem('token');
        }
    };

    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    }

    return authTokenFactory;
})