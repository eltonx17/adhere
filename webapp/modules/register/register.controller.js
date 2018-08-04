/**
 * Author:Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('registerController', registerController);

    /* ngInject */
    function registerController($scope, $state, appConfig, $stateParams, apiService, $timeout, $mdDialog, $http, $rootScope) {
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

            apiService.serviceRequest({
                    method: 'POST',
                    url: appConfig.requestURL.mentorList
                }, function (data) {
                    if (data && data.error && data.error.msg) { // error from server
                        apiService.toast(data.error.msg, {
                            type: 'f'
                        });
                    } else {
                        if (data && data.length && data.length > 0) {
                            vm.mentorList = data;
                        } else {
                            // false condition goes here
                        }
                    }
                },
                function (fail) { // service fails
                    // false condition goes here
                });
        };

        /**
         * login function
         **/
        vm.register = function (ev) {
            if (ev)
                ev.stopPropagation();

            if (vm.formData.firstName && vm.formData.lastName && vm.formData.email && vm.formData.password && vm.formData.cpassword && vm.formData.userType) {
                vm.registering = true;
                
                var userInfo = {};
                // sent login request to server
                apiService.serviceRequest({
                        method: 'POST',
                        url: appConfig.requestURL.register,
                        params: {
                            firstName: vm.formData.firstName,
                            lastName: vm.formData.lastName,
                            email: vm.formData.email,
                            password: vm.formData.password,
                            userType: vm.formData.userType,
                            mentorId: vm.formData.mentorId
                        }
                    }, function (data) {

                        if (data && data.error && data.error.msg) { // error from server
                            apiService.toast(data.error.msg, {
                                type: 'f'
                            });                            
                            vm.formData.password = undefined;
                        } else {
                            apiService.toast(data.data, {
                                type: 'f'
                            });
                            $state.go('login',{
                                email: vm.formData.email
                            });
                        }
                    },
                    function (fail) { // service fails
                        vm.registering = false;
                    });
            }
        };


        init();

    }

})();