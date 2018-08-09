/**
 * Author:Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('loginController', loginController);

    /* ngInject */
    function loginController($scope, $state, appConfig, $stateParams, apiService, $timeout, $mdDialog, $http, $rootScope) {
        var vm = this;


        function init() {

            vm.appTitle = appConfig.title; // binds app title from config  
            vm.formData = {};

            if ($stateParams && $stateParams.email) {
                vm.formData.username = $stateParams.email;
            }

            // binds the resize event
            angular.element(window).bind('resize', function () {
                if (document.activeElement) {
                    $timeout(function () {
                        document.activeElement.scrollIntoView(); // to bring the focus element to view when keyboard is on
                    }, 200);
                    document.activeElement.scrollIntoView(); // to bring the focus element to view when keyboard is on
                }
            });
        };

        /**
         * login function
         **/
        vm.login = function (ev) {
            if (ev)
                ev.stopPropagation();

            vm.loginErr = false;

            if (vm.formData.username && vm.formData.password) {
                var userInfo = {};
                vm.logging = true;
                // sent login request to server
                apiService.serviceRequest({
                        method: 'POST',
                        url: appConfig.requestURL.login,
                        params: {
                            email: vm.formData.username,
                            password: vm.formData.password
                        }
                    }, function (response) {

                        if (response && response.error && response.error.msg) { // error from server                                          
                            $timeout(function () {
                                vm.logging = false;
                                vm.loginErr = true;
                                vm.logErrMsg = response.error.msg || "Something went wrong, try again.";
                            });
                            vm.formData.password = undefined;
                        } else {
                            vm.loginErr = false;
                            var user = response.data;
                            user.usertype = parseInt(user.usertype);
                            window.localStorage.setItem('user', angular.toJson(user));
                            if (user.usertype == 0) { // admin
                                $state.go("app.adminHome");
                            }
                            if (user.usertype == 1) { // mentor
                                $state.go("app.mentorHome");
                            }
                            if (user.usertype == 2) { // mentee
                                $state.go("app.home");
                            }
                        }
                    },
                    function (fail) { // service fails
                        vm.logging = false;
                        vm.loginErr = true;
                        vm.logErrMsg = "Something went wrong, try again.";
                    });
            } else {
                vm.loginErr = true;
                vm.logErrMsg = "Please fill in all details.";
            }
        };


        init();

    }

})();