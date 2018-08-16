/**
 * Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('adminController', adminController);

    /* ngInject */
    function adminController($scope, appConfig, $timeout, apiService, $state) {
        var vm = this;

        function init() {
            vm.user = window.localStorage.getItem('user') ? angular.fromJson(window.localStorage.getItem('user')) : undefined;
            vm.appTitle = appConfig.title; // binds app title from config
            vm.getDetails();
        };
        /**
         *
         */
        vm.getDetails = function () {
            apiService.serviceRequest({
                    method: 'POST',
                    url: appConfig.requestURL.adminDashInfo
                }, function (response) {
                    if (response && response.error && response.error.msg) { // error from server                                         
                        $timeout(function () {
                            vm.loginErr = true;
                            vm.logErrMsg = response.error.msg || "Something went wrong, try again.";
                        });
                    } else {
                        vm.adminInfo = response;
                        for (var i = 0; i < vm.adminInfo.listOfUsers.length; i++)
                            vm.adminInfo.listOfUsers[i].accountstatus = (vm.adminInfo.listOfUsers[i].accountstatus == "1" || vm.adminInfo.listOfUsers[i].accountstatus == 1) ? true : false;
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
                    url: appConfig.requestURL.toggleUserStatus,
                    params: {
                        userID: item.uid,
                        action: (item.accountstatus || item.accountstatus == "1" || item.accountstatus == 1) ? 1 : 0
                    }
                }, function (response) {
                    if (response && response.error && response.error.msg) { // error from server                                         
                        $timeout(function () {
                            vm.loginErr = true;
                            vm.logErrMsg = response.error.msg || "Something went wrong, try again.";
                        });
                    } else {
                        (item.accountstatus || item.accountstatus == "1" || item.accountstatus == 1) ? vm.adminInfo.inactiveUsers--: vm.adminInfo.inactiveUsers++;
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