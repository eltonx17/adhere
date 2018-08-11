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
        };

        function getDetails() {
            apiService.serviceRequest({
                    method: 'POST',
                    url: appConfig.requestURL.mentorDashInfo
                }, function (response) {
                    if (response && response.error && response.error.msg) { // error from server                                         
                        $timeout(function () {
                            vm.loginErr = true;
                            vm.logErrMsg = response.error.msg || "Something went wrong, try again.";
                        });
                    } else {

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