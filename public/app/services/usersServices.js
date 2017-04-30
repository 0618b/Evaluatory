angular.module('usersServices', [])
    .factory('userServices', function($http) {

        userFactory = {};

        userFactory.createUser = function(userData) {
            return $http.post('/api/users', userData);
        };

        // Get All users
        userFactory.getAllUsers = function() {
            return $http.get('/api/users');
        };

        // Get single user by id
        userFactory.getUserById = function(id) {
            return $http.get('/api/users/' + id);
        };

        // Edit an user
        userFactory.updateUser = function(id, user) {
            return $http.put('/api/user/' + id, user);
        };

        // Delete user
        userFactory.deleteUser = function(id) {
            return $http.delete('/api/users/' + id);
        };

        return userFactory; // Return Self-Template Factory Object

    });