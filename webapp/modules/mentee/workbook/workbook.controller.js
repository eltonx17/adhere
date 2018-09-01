/**
 * Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('workbookController', workbookController);

    /* ngInject */
    function workbookController($scope, appConfig, $timeout, apiService, $rootScope, $state) {
        var vm = this;


        function init() {
            debugger
            vm.appTitle = appConfig.title; // binds app title from config
            vm.user = window.localStorage.getItem('user') ? angular.fromJson(window.localStorage.getItem('user')) : undefined;
            vm.currentStageInfo();
        };
        /**
         *
         */
        vm.currentStageInfo = function (item) {
            // sent login request to server
            apiService.serviceRequest({
                    method: 'GET',
                    url: appConfig.requestURL.currentMenteeStageInfo,
                    params: {
                        menteeID: vm.user.uid
                    }
                }, function (response) {
                    if (response && response.error && response.error.msg) { // error from server                                                 
                        $timeout(function () {
                            vm.regoErrMsg = data.error.msg || "Something went wrong, try again.";
                        });
                    } else {
                        debugger
                        //if (response && response.data && response.data.length > 0)
                        // vm.competencyList = response.data;
                        var gst = (response.gst) ? parseInt(response.gst) : 1;
                        vm.stageList = [{
                            title: "Stage 1",
                            active: true
                            }, {
                                            title: "Stage 2",
                                            active: false
                            }, {
                                            title: "Stage 3",
                                            active: false
                            }, {
                                            title: "Stage 4",
                                            active: false
                            }, {
                                            title: "Stage 5",
                                            active: false
                            }, {
                                            title: "Stage 6",
                                            active: false
                            }];
                    }
                },
                function (fail) { // service fails
                    vm.registering = false;
                    vm.regoErr = true;
                    vm.regoErrMsg = "Something went wrong, try again.";
                });
        };

        init();

    }

})();