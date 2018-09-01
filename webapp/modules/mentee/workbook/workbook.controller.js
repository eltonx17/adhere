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
                            var gst = (resp.gst) ? parseInt(resp.gst) : 1;
                            
                            vm.stageList = [{
                                title: "Stage 1",
                                active: (gst >= 1) ? true : false
                            }, {
                                title: "Stage 2",
                                active: (gst >= 2) ? true : false
                            }, {
                                title: "Stage 3",
                                active: (gst >= 3) ? true : false
                            }, {
                                title: "Stage 4",
                                active: (gst >= 4) ? true : false
                            }, {
                                title: "Stage 5",
                                active: (gst >= 5) ? true : false
                            }];
                            
                            vm.stageVisibility = {
                                stage1: false,
                                stage2: false,
                                stage3: false,
                                stage4: false,
                                stage5: false,
                            };

                            vm.stageVisibility["stage" + gst] = true;

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
                        mentorAgree: true
                    },
                    rights: {
                        mentor: {
                            readOnly: false
                        },
                        mentee: {
                            readOnly: false
                        }
                    }
                },
                stage
            }
            return tmp[stage];
        };

        init();

    }

})();