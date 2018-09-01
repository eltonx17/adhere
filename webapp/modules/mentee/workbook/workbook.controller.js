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
                            };

                            console.log(vm.stages);
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
         **/
        vm.getDefaults = function (stage) {
            var tmp = {
                stage1: {
                    agreement: {
                        menteeName: "",
                        mentorName: "",
                        menteeWorkPlace: "",
                        mentorWorkPlace: "",
                        menteeRole: "",
                        mentorRole: "",
                        mentorGoal: "",
                        menteeGoal: ""
                    },
                    assesment: {
                        menteeNote: "",
                        mentorNote: ""
                    },
                    mappingEvidence: {
                        menteeNote: "",
                        mentorNote: ""
                    },
                    actionPlan: {
                        menteeNote: "",
                        mentorNote: ""
                    },
                    verificationPlan: {
                        menteeNote: "",
                        mentorNote: ""
                    },
                    meetings: {
                        timeData: "",
                        methodToRecord: "",
                        timing: [
                            {
                                date: "",
                                format: ""
                            }
                        ],
                        reviewDate: [
                            {
                                date: ""
                            }
                        ],
                        problemSolving: ""
                    },
                    confidentiality: {
                        menteeAgree: false,
                        mentorAgree: false
                    },
                    rights: {
                        mentor: {
                            readOnly: false
                        },
                        mentee: {
                            readOnly: false
                        }
                    }
                }
            }
            return tmp[stage];
        };
        /**
         *
         */
        vm.saveStage1 = function () {
            console.log(vm.stagesList.stage1);
            vm.stagesList.stage1.rights.mentee.readOnly = true;
            debugger
            debugger
            apiService.serviceRequest({
                    method: 'POST',
                    url: appConfig.requestURL.updateWorkBook,
                    data: {
                        menteeID: vm.user.uid,
                        stageData: vm.stagesList.stage1,
                        gstData: vm.gst,
                        usertype: vm.user.usertype,
                    }
                }, function (response) {
                    if (response && response.error && response.error.msg) { // error from server                                                 
                        $timeout(function () {
                            vm.regoErrMsg = data.error.msg || "Something went wrong, try again.";
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

        init();

    }

})();