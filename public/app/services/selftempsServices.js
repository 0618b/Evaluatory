angular.module('selftempsServices', ['ngResource'])
    .factory('selfTemplateService', function($http, $resource) {
        return $resource('/api/selftemps', {}, {
            query: { method: 'GET', isArray: true },
            create: { method: 'POST' }
        })
    })
    .factory('selfTemplateService', function($http, $resource) {
        return $resource('/api/selftemps/:id', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT', params: { id: '@id' } },
            delete: { method: 'DELETE', params: { id: '@id' } }
        })
    });