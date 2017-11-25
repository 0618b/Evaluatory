angular.module('mainApp', ['angular.filter', 'mainRoutes', 'selftempsControllers', 'selftempsServices', 'othertempsControllers', 'othertempsServices', 'usersControllers', 'usersServices', 'mainControllers', 'authServices'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptors');
    });