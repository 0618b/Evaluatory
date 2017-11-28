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

        // get stlist
        userFactory.getEvalUsers = function() {
            return $http.get('/api/users/ststatus');
        }

        // Get single user by id
        userFactory.getUserById = function(id) {
            return $http.get('/api/users/' + id);
        };

        // Get permission
        userFactory.getPermission = function() {
            return $http.get('/api/permission/');
        };

        // Edit an user
        userFactory.updateUser = function(id, user) {
            return $http.put('/api/user/edit' + id, user);
        };

        // Delete user
        userFactory.deleteUser = function(id) {
            return $http.delete('/api/user/' + id);
        };

        return userFactory; // Return Self-Template Factory Object

    });