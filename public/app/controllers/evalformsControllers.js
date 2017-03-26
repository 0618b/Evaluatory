angular.module('evalformsControllers', ['evalformsServices'])
    .controller('evalformsControllers', function(EvalForm, $scope) {
            var app = this;

            app.editAndDeleteAccess = false;
            app.errorMsg = false;
            app.showMoreError = false;

            function getEvalForms() {
                EvalForm.getEvalForms().then(function(data) {
                    console.log('GETTER');
                    if(data.data.success) {
                        if(data.data.permission === 'admin') {
                            app.evalforms = data.data.evalforms;
                            app.editAndDeleteAccess = true;
                        } else {
                            app.editAndDeleteAccess = false;
                            app.errorMsg = data.data.message;
                        }
                    }
                });
            }

            getEvalForms();

            app.deleteEvalForms() = function(id) {
                EvalForm.deleteEvalForms(id).then(function(data) {
                    if (data.data.success) {
                        getEvalForms();
                    } else {
                        app.showMoreError = data.data.message;
                    }
                });
            };  
        });

