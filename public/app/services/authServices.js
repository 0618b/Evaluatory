angular.module('authServices', [])
    .factory('authServices', function($http, authToken) {

        authFactory = {};

        // Log-in function
        authFactory.login = function(loginData) {
            return $http.post('/api/authenticate', loginData).then(function(data) {
                authToken.setToken(data.data.token);
                return data;
            });
        };

        // Function to check if user is currently logged in
        authFactory.isLoggedIn = function() {
            if (authToken.getToken()) {
                return true; // Return true if in storage
            } else {
                return false; // Return false if not in storage
            };
        };

        // Function to logout the user
        authFactory.logout = function() {
            authToken.setToken();
        };

        return authFactory;

    })

// Factory: AuthToken handles all token-associated functions
.factory('authToken', function($window) {
    var authTokenFactory = {};

    // Function to set and remove the token to/from local storage
    authTokenFactory.setToken = function(token) {
        // Check if token was provided in function parameters
        if (token) {
            $window.localStorage.setItem('token', token); // If so, set the token in local storage
        } else {
            $window.localStorage.removeItem('token'); // Otherwise, remove any token found in local storage (logout)
        }
    };

    // Function to retrieve token found in local storage
    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    }

    return authTokenFactory;
})