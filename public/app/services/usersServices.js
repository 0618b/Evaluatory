angular.module('usersServices', [])
    .factory('userServices', function($http) {

        userFactory = {};

        stFactory.createUser = function(user) {
            return $http.post('/api/users', user);
        };

        // Get All users
        stFactory.getAllUsers = function() {
            return $http.get('/api/users');
        };

        // Get single user by id
        stFactory.getUserById = function(id) {
            return $http.get('/api/users/' + id);
        };

        // Edit an user
        stFactory.updateUser = function(user) {
            return $http.put('/api/user', user._id);
        };

        // Delete user
        stFactory.deleteUser = function(id) {
            return $http.delete('/api/users/' + id);
        };

        return userFactory; // Return Self-Template Factory Object

    });