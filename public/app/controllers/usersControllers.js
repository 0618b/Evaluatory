angular.module('usersControllers', ['usersServices', 'selftempsServices'])
    .controller('usersCtrl', function(userServices, $scope, $location, $routeParams, $timeout) {

        function getAllUsers() {
            userServices.getAllUsers().then(function(data) {
                $scope.users = data.data;
                console.log(data.data);
            })
        }

        getAllUsers();

        $scope.createUser = function(userData) {
            userServices.createUser(this.userData).then(function(data) {
                if (data.data.success === true) {
                    $scope.msg = data.data.msg;
                    swal({
                        title: $scope.msg,
                        type: 'success',
                        timer: 2000
                    })
                    $timeout(function() {
                        $location.url('/users')
                    }, 500);
                } else {
                    $scope.msg = data.data.msg;
                    swal({
                        title: $scope.msg,
                        type: 'error',
                        timer: 2000
                    })
                }

            })
        }

        $scope.deleteUser = function(id) {
            userServices.deleteUser(id).then(function(data) {
                getAllUsers();
                console.log('Success');
            })
        }

        $scope.isNotAdmin = function(data) {
            return data.permission != "admin";
        }

    }).controller('userEvalCtrl', function(userServices, $scope, $location, $routeParams, $timeout) {

        function getEvalUsers() {
            userServices.getEvalUsers().then(function(data) {
                $scope.userEval = data.data;
                console.log(data.data);
                var present = new Date();
                var month = present.getMonth() + 1;
                var year = present.getFullYear() + 543;
                var nextYear = year + 1;
                $scope.getMonth = month;
                $scope.evalRound = "";
                if (month >= 10 && month <= 12 || month >= 1 && month <= 3) {
                    $scope.evalRound = 1 + "/" + year + "-" + nextYear;
                } else if (month >= 4 && month <= 9) {
                    $scope.evalRound = 2 + "/" + year;
                }
            })
        }

        $scope.isNotAdmin = function(data) {
            return data.permission != "admin";
        }

        getEvalUsers();

    }).controller('verifyEvalCtrl', function(userServices, selfTemplateService, $scope, $location, $routeParams, $timeout) {

        function getVerifyUsers() {
            userServices.getVerifyUsers().then(function(data) {
                $scope.userVerify = data.data;
                console.log(data.data);
                var present = new Date();
                var date = present.getDate();
                var month = present.getMonth() + 1;
                var year = present.getFullYear() + 543;
                var nextYear = year + 1;
                $scope.evalRound = "";
                $scope.presentDate = date + "/" + month + "/" + year;
                if (month >= 10 && month <= 12 || month >= 1 && month <= 3) {
                    $scope.evalRound = 1 + "/" + year + "-" + nextYear;
                } else if (month >= 4 && month <= 9) {
                    $scope.evalRound = 2 + "/" + year;
                }
            })
        }

        $scope.isNotAdmin = function(data) {
            return data.permission != "admin";
        }

        getVerifyUsers();

    }).controller('checkScoreCtrl', function(userServices, $scope, $location, $routeParams, $timeout) {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear() + 543;
        var nextYear = year + 1;
        $scope.evalRound = "";
        $scope.getMonth = month;
        $scope.presentDate = date + "/" + month + "/" + year;

        if (month >= 10 && month <= 12 || month >= 1 && month <= 3) {
            $scope.evalRound = 1 + "/" + year + "-" + nextYear;
        } else if (month >= 4 && month <= 9) {
            $scope.evalRound = 2 + "/" + year;
        }

        function checkScores() {
            userServices.checkScores().then(function(data) {
                $scope.selfTemplateScore = data.data.selftemplates[0];
                $scope.otherTemplateScore = data.data.othertemplates;

                s0 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[0].choiceList[0].score;
                s1 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[0].choiceList[1].score;
                s2 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[0].choiceList[2].score;
                s3 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[0].choiceList[3].score;
                s4 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[0].choiceList[4].score;
                s5 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[1].choiceList[0].score;
                s6 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[1].choiceList[1].score;
                s7 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[1].choiceList[2].score;
                s8 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[2].choiceList[0].score;
                s9 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[2].choiceList[1].score;

                w0 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[0].choiceList[0].evalWeight;
                w1 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[0].choiceList[1].evalWeight;
                w2 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[0].choiceList[2].evalWeight;
                w3 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[0].choiceList[3].evalWeight;
                w4 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[0].choiceList[4].evalWeight;
                w5 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[1].choiceList[0].evalWeight;
                w6 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[1].choiceList[1].evalWeight;
                w7 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[1].choiceList[2].evalWeight;
                w8 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[2].choiceList[0].evalWeight;
                w9 = $scope.selfTemplateScore.self_template.sectionGroup[0].choiceGroupList[2].choiceList[1].evalWeight;

                let othertemp_arr = $scope.otherTemplateScore;
                let numberOfOtherTempOfEachRound = 18;
                let score_arr = [s0, s1, s2, s2, s4, s5, s6, s7, s8, s9];
                let evalWeight_arr = [w0, w1, w2, w3, w4, w5, w6, w7, w8, w9];
                $scope.STtotalScore = 0;
                $scope.STtotalWeight = 0;

                for (var i = 0; i < score_arr.length; i++) {
                    $scope.STtotalScore += score_arr[i];
                }

                for (var i = 0; i < evalWeight_arr.length; i++) {
                    $scope.STtotalWeight += evalWeight_arr[i];
                }

                function sum(obj) {
                    var sum = 0;
                    for (var el in obj) {
                        if (obj.hasOwnProperty(el)) {
                            sum += parseFloat(obj[el]);
                        }
                    }
                    return sum;
                }

                var ot1 = sum(othertemp_arr[0].other_template[0]);
                var ot2 = sum(othertemp_arr[1].other_template[0]);
                var ot3 = sum(othertemp_arr[2].other_template[0]);

                var otherTempScoreArr = [ot1, ot2, ot3]
                var otPercentWeight = 30; // 30 percent
                var otherTempWeight = 336; // from 3 othertemplate records score weight (3*112 = 336)

                var otherTempTotal = 0;
                for (var i = otherTempScoreArr.length; i--;) {
                    otherTempTotal += otherTempScoreArr[i];
                    $scope.OTtotalScore = (otherTempTotal * otPercentWeight) / otherTempWeight;
                }


                /*if (othertemp_arr.length == numberOfOtherTempOfEachRound) {
                    var ot1 = sum(othertemp_arr[0].other_template[0]);
                    var ot2 = sum(othertemp_arr[1].other_template[0]);
                    var ot3 = sum(othertemp_arr[2].other_template[0]);
                    var ot4 = sum(othertemp_arr[3].other_template[0]);
                    var ot5 = sum(othertemp_arr[4].other_template[0]);
                    var ot6 = sum(othertemp_arr[5].other_template[0]);
                    var ot7 = sum(othertemp_arr[6].other_template[0]);
                    var ot8 = sum(othertemp_arr[7].other_template[0]);
                    var ot9 = sum(othertemp_arr[8].other_template[0]);
                    var ot10 = sum(othertemp_arr[9].other_template[0]);
                    var ot11 = sum(othertemp_arr[10].other_template[0]);
                    var ot12 = sum(othertemp_arr[11].other_template[0]);
                    var ot13 = sum(othertemp_arr[12].other_template[0]);
                    var ot14 = sum(othertemp_arr[13].other_template[0]);
                    var ot15 = sum(othertemp_arr[14].other_template[0]);
                    var ot16 = sum(othertemp_arr[15].other_template[0]);
                    var ot17 = sum(othertemp_arr[16].other_template[0]);
                    var ot18 = sum(othertemp_arr[17].other_template[0]);

                    var otherTempScoreArr = [ot1, ot2, ot3, ot4, ot5, ot6, ot7, ot8, ot9, ot10, ot11, ot12, ot13, ot14, ot15, ot16, ot17, ot18]
                    var otherTempWeight = 2016; // from 18 othertemplate records score weight (18*112 = 2016)

                    var otherTempTotal = 0;
                    for (var i = otherTempScoreArr.length; i--;) {
                        $scope.otherTempTotal += otherTempScoreArr[i];
                    }
                    
                }*/
            });
        }

        checkScores();

    }).directive('ngReallyClick', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    var message = attrs.ngReallyMessage;
                    if (message && confirm(message)) {
                        scope.$apply(attrs.ngReallyClick);
                    }
                });
            }
        }
    }]);