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
            vm.userList = [{
                name : "Nidhin",
                age : 1
            }]
        };

        vm.getDetails = function() {
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

                    }
                },
                function (fail) { // service fails                  
                    vm.loginErr = true;
                    vm.logErrMsg = "Something went wrong, try again.";
                });
        };
        
        vm.toggleStatus = function(){
          console.log(1)
        };

        init();

    }

})();