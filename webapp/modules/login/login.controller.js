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

            if (vm.formData.username && vm.formData.password) {
                var userInfo = {};
                // sent login request to server
                apiService.serviceRequest({
                        method: 'POST',
                        url: appConfig.requestURL.login,
                        params: {
                            Email: vm.formData.username,
                            Password: vm.formData.password
                        }
                    }, function (data) {

                        if (data && data.error) { // error from server
                            apiService.toast(data.error.message, {
                                type: 'f'
                            });
                            vm.logging = false;
                            vm.formData.password = undefined;
                        } else {

                        }
                    },
                    function (fail) { // service fails
                        vm.logging = false;
                    });
                if (vm.formData.username == "admin") {
                    userInfo.type = "admin";
                    window.localStorage.setItem('user', angular.toJson(userInfo));
                    $state.go("app.adminHome")
                } else {
                    userInfo.type = "user";
                    window.localStorage.setItem('user', angular.toJson(userInfo));
                    $state.go("app.home")
                }
            }
        };


        init();

    }

})();