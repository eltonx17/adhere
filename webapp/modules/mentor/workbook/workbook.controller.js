/**
 * Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('mentorWorkbookController', mentorWorkbookController);

    /* ngInject */
    function mentorWorkbookController($scope, appConfig, $timeout, apiService, $rootScope, $state, $stateParams) {
        var vm = this;


        function init() {
            vm.appTitle = appConfig.title; // binds app title from config
            vm.user = window.localStorage.getItem('user') ? angular.fromJson(window.localStorage.getItem('user')) : undefined;
            vm.menteeId = $stateParams.menteeId;
            vm.currentStageInfo($stateParams.menteeId);
            vm.stageName = {
                1: "Mentor - Mentee Agreement",
                2: "Self - Assesments",
                3: "Action Plan",
                4: "Summary of Evidence",
                5: "Feedback"
            };
        };
        /**
         *
         */
        vm.currentStageInfo = function (id) {
            console.log(id);
            // sent login request to server
            apiService.serviceRequest({
                    method: 'GET',
                    url: appConfig.requestURL.currentMenteeStageInfo,
                    params: {
                        menteeID: id
                    }
                }, function (response) {
                    if (response && response.error && response.error.msg) { // error from server                                                 
                        $timeout(function () {
                            vm.regoErrMsg = data.error.msg || "Something went wrong, try again.";
                        });
                    } else {

                        if (response && response.data) {
                            var resp = response.data;
                            vm.gst = (resp.gst) ? parseInt(resp.gst) : 1;

                            vm.stageList = [{
                                title: "Stage 1",
                                active: (vm.gst >= 1) ? true : false
                            }, {
                                title: "Stage 2",
                                active: (vm.gst >= 2) ? true : false
                            }, {
                                title: "Stage 3",
                                active: (vm.gst >= 3) ? true : false
                            }, {
                                title: "Stage 4",
                                active: (vm.gst >= 4) ? true : false
                            }, {
                                title: "Stage 5",
                                active: (vm.gst >= 5) ? true : false
                            }];

                            vm.stageVisibility = {
                                stage1: false,
                                stage2: false,
                                stage3: false,
                                stage4: false,
                                stage5: false,
                            };

                            vm.stageVisibility["stage" + vm.gst] = true;

                            vm.stagesList = {
                                stage1: (resp.stage1) ? resp.stage1 : vm.getDefaults("stage1"),
                                stage2: resp.stage2
                            };
                        }
                    }
                },
                function (fail) { // service fails                    
                    vm.regoErr = true;
                    vm.regoErrMsg = "Something went wrong, try again.";
                });
        };
        /**
         *
         */
        vm.saveStage = function (stage) {
            
            if(stage == 1){
                vm.stagesList.stage1.rights.mentee.readOnly = true;
            } else if (stage == 2){
                 vm.stagesList.stage2.rights.mentee.readOnly = true;
            }
            
            apiService.serviceRequest({
                    method: 'POST',
                    url: appConfig.requestURL.updateWorkBook,
                    data: {
                        menteeID: vm.user.uid,
                        stageData: vm.stagesList.stage2,
                        gstData: vm.gst,
                        usertype: vm.user.usertype,
                    }
                }, function (response) {
                    if (response && response.error && response.error.msg) { // error from server                                                 
                        $timeout(function () {
                            vm.regoErrMsg = response.error.msg || "Something went wrong, try again.";
                        });
                    } else {
                        if (response && response.data) {

                        }
                    }
                },
                function (fail) { // service fails                    
                    vm.regoErr = true;
                    vm.regoErrMsg = "Something went wrong, try again.";
                });
        };
        /**
         *
         */
        vm.nextStage = function () {
            vm.gst++;
            vm.showStage(vm.gst);
        };
        /**
         *
         */
        vm.navigateToStage = function (item, index) {
            if (item.active) {
                vm.gst = index;
                vm.showStage(index);
            }
        }
        /**
         *
         */
        vm.showStage = function (index) {            
            vm.stageVisibility = {
                stage1: false,
                stage2: false,
                stage3: false,
                stage4: false,
                stage5: false,
            };

            vm.stageVisibility["stage" + index] = true;
        }

        init();

    }

})();