angular.module('mainApp', ['mainRoutes', 'selftempsControllers', 'selftempsServices', 'usersControllers', 'usersServices', 'mainControllers', 'authServices'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptors');
    });