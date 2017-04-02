angular.module('evalformsControllers', [])
    .controller('addCtrl', function($http) {

        this.addEvalform = function(ef) {
            console.log('form submitted');
            console.log(this.ef);
            $http.post('/api/evalforms', this.ef).then(function(data){
                console.log(data.data.success);
                console.log(data.data.message);
            })
        };
    });

