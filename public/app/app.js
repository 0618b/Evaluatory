angular.module('mainApp', ['angular.filter', 'mainRoutes', 'selftempsControllers', 'selftempsServices', 'usersControllers', 'usersServices', 'mainControllers', 'authServices'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptors');
    });