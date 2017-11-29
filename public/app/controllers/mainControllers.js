angular.module('mainControllers', ['authServices', 'usersServices', 'ui.bootstrap'])
    .controller('mainCtrl', function(authServices, userServices, $scope, $location, $routeParams, $window, $interval, $timeout, $rootScope) {
        $scope.loadme = false;
        $rootScope.isAdmin = false;

        var hideLogInModal = function() {
            $("#loginModal").modal('hide'); // Hide modal once criteria met
        };

        if (authServices.isLoggedIn()) {
            // Check Token
            authServices.getUser().then(function(data) {
                // Check if the returned user is undefined (Expired)
                if (data.data.username === undefined) {
                    authServices.logout(); //Log user out
                    $scope.isLoggedIn = false; //Set session
                    $location.url('/home');
                    $scope.loadme = true;
                }
            })
        }

        $scope.checkSession = function() {
            if (authServices.isLoggedIn()) {
                $scope.checkingSession = true; // Use variable to keep track if the interval is already running
                // Run interval ever 30000 milliseconds (30 seconds) 
                var interval = $interval(function() {
                    var token = $window.localStorage.getItem('token'); // Retrieve the user's token from the client local storage
                    // Ensure token is not null (will normally not occur if interval and token expiration is setup properly)
                    if (token === null) {
                        $interval.cancel(interval);
                    } else {
                        // Parse JSON Web Token using AngularJS for timestamp conversion
                        self.parseJwt = function(token) {
                            var base64Url = token.split('.')[1];
                            var base64 = base64Url.replace('-', '+').replace('_', '/');
                            return JSON.parse($window.atob(base64));
                        };
                        var expireTime = self.parseJwt(token); // Save parsed token into variable
                        var timeStamp = Math.floor(Date.now() / 1000); // Get current datetime timestamp
                        var timeCheck = expireTime.exp - timeStamp; // Subtract to get remaining time of token
                        // Check if token has less than 30 minutes till expiration
                        if (timeCheck <= 1800) {
                            $interval.cancel(interval); //Stop interval
                        }
                    }
                }, 3000);
            }
        };

        $scope.checkSession(); // Ensure check is ran check, even if user refreshes

        $rootScope.$on('$routeChangeStart', function() {
            if (!$scope.checkingSession) $scope.checkSession();

            //Check if user is logged in
            if (authServices.isLoggedIn()) {
                $rootScope.showLoginButton = false;
                authServices.getUser().then(function(data) {
                    if (data.data.username === undefined) {
                        $rootScope.showLoginButton = true;
                        $scope.isLoggedIn = false;
                        authServices.logout();
                        $location.url('/home');
                    } else {
                        $rootScope.showLoginButton = false;
                        $scope.isLoggedIn = true;
                        $rootScope.userDatas = data.data;
                        console.log($rootScope.userDatas);
                        userServices.getPermission().then(function(data) {
                            if (data.data.permission === "admin") {
                                $rootScope.isAdmin = true;
                                $scope.loadme = true;
                            } else {
                                $rootScope.isAdmin = false;
                                $scope.loadme = true;
                            }
                        })
                    }
                });
            } else {
                $rootScope.showLoginButton = true;
                $scope.isLoggedIn = false;
                $scope.loadme = true;
            }

        });

        $scope.doLogout = function() {
            $rootScope.showLoginButton = true;
            authServices.logout();
            swal({
                title: 'กำลังออกจากระบบ',
                imageUrl: 'assets/img/spinner.gif',
                timer: 800
            })
            $timeout(function() {
                $location.url('/home');
            }, 800)
        };

        $scope.doLogin = function(loginData) {
            authServices.login(this.loginData).then(function(data) {
                if (data.data.success === true) {
                    $rootScope.showLoginButton = false;
                    $scope.msg = data.data.msg;
                    this.loginData = '';
                    hideLogInModal();
                    swal({
                        title: $scope.msg,
                        type: 'success',
                        timer: 2000
                    })
                } else {
                    $scope.msg = data.data.msg;
                    swal({
                        title: $scope.msg,
                        type: 'error',
                        timer: 2000
                    })
                };
            });
        };

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear() + 543;
        $scope.evalRound = "";

        $scope.presentDate = date + "/" + month + "/" + year;
        if (month >= 10 && month <= 12 || month >= 1 && month <= 3) {
            $scope.evalRound = 1 + "/" + year;
        } else if (month >= 4 && month <= 9) {
            $scope.evalRound = 2 + "/" + year;
        }
    });