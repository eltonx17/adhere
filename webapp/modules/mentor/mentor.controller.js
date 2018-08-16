/**
 * Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('mentorController', mentorController);

    /* ngInject */
    function mentorController($scope, appConfig, $timeout, apiService, $state) {
        var vm = this;

        function init() {
            vm.user = window.localStorage.getItem('user') ? angular.fromJson(window.localStorage.getItem('user')) : undefined;
            vm.appTitle = appConfig.title; // binds app title from config
            vm.getDetails();
        };

        vm.getDetails = function () {
            apiService.serviceRequest({
                    method: 'POST',
                    url: appConfig.requestURL.mentorDashInfo,
                    params: {
                        mentorID: vm.user.uid
                    }
                }, function (response) {
                    if (response && response.error && response.error.msg) { // error from server                                         
                        $timeout(function () {
                            vm.loginErr = true;
                            vm.logErrMsg = response.error.msg || "Something went wrong, try again.";
                        });
                    } else {
                        vm.mentorInfo = response;
                        for (var i = 0; i < vm.mentorInfo.listOfMentees.length; i++)
                            vm.mentorInfo.listOfMentees[i].mapstatus = (vm.mentorInfo.listOfMentees[i].mapstatus == "1" || vm.mentorInfo.listOfMentees[i].mapstatus == 1) ? true : false;
                    }
                },
                function (fail) { // service fails                  
                    vm.loginErr = true;
                    vm.logErrMsg = "Something went wrong, try again.";
                });
        };
        /**
         *
         */
        vm.toggleStatus = function (item) {
            apiService.serviceRequest({
                    method: 'POST',
                    url: appConfig.requestURL.toggleMenteeStatus,
                    params: {
                        menteeID: item.uid,
                        action: (item.mapstatus || item.mapstatus == "1" || item.mapstatus == 1) ? 1 : 0
                    }
                }, function (response) {
                    if (response && response.error && response.error.msg) { // error from server                                         
                        $timeout(function () {
                            vm.loginErr = true;
                            vm.logErrMsg = response.error.msg || "Something went wrong, try again.";
                        });
                    } else {
                        (item.mapstatus || item.mapstatus == "1" || item.mapstatus == 1) ? vm.mentorInfo.inactiveMentees--: vm.mentorInfo.inactiveMentees++;
                    }
                },
                function (fail) { // service fails                  
                    vm.loginErr = true;
                    vm.logErrMsg = "Something went wrong, try again.";
                });
        };


        init();

    }

})();