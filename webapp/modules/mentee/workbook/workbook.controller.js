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
            vm.stageName = {
                1: "Mentor - Mentee Agreement",
                2: "Self - Assesment",
                3: "Action Plan",
                4: "Summary of Evidence",
                5: "Feedback"
            }
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
                                stage2: resp.stage2,
                                stage3: (resp.stage3) ? resp.stage3 : vm.getDefaults("stage3"),
                                stage4: (resp.stage4) ? resp.stage4 : vm.getDefaults("stage4")
                            };

                            console.log(vm.stagesList);
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
                },
                stage3: {
                    items: [{
                        term: "",
                        goal: "",
                        resource: "",
                        review_date: "",
                        due_date: ""
                    }],
                    rights: {
                        mentor: {
                            readOnly: false
                        },
                        mentee: {
                            readOnly: false
                        }
                    }
                },
                stage4: {
                    items: [{
                        title: "",
                        date_completed: "",
                        evidence_category: "",
                        knowledge: "",
                        skills: "",
                        attitude: "",
                        competency: [{
                            text : "Living well from older people across communities and groups",
                            checked : false
                        },{
                            text : "Maximising health outcomes",
                            checked : false
                        },{
                            text : "Communicating effectively",
                            checked : false
                        },{
                            text : "Facilitating transitions in care",
                            checked : false
                        },{
                            text : "Facilitating choices within legal and ethical frameworks",
                            checked : false
                        },{
                            text : "Partnering with family carers",
                            checked : false
                        },{
                            text : "Promoting mental health and psychological well-being",
                            checked : false
                        },{
                            text : "Providing evidence-based dementia care",
                            checked : false
                        },{
                            text : "Providing optimal pain management",
                            checked : false
                        },{
                            text : "Providing palliative care",
                            checked : false
                        },{
                            text : "Enabling access to technology",
                            checked : false
                        }],
                        mentor_notify_date : ""
                    }],
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
        /**
         *
         */
        vm.setAnswer = function (question, ans) {
            if (!vm.stagesList.stage2.rights.mentee.readOnly)
                question.answer = ans;
            $timeout();
        };
        /**
         *
         */
        vm.addGoal = function () {
            if(vm.stagesList.stage3.rights.mentor.readOnly)
                return;
            
            vm.stagesList.stage3.items.push({
                term: "",
                goal: "",
                resource: "",
                review_date: "",
                due_date: ""
            });
        };
         /**
         *
         */
        vm.addSummary = function () {
            if(vm.stagesList.stage4.rights.mentor.readOnly)
                return;
            
            vm.stagesList.stage4.items.push({
                        title: "",
                        date_completed: "",
                        evidence_category: "",
                        knowledge: "",
                        skills: "",
                        attitude: "",
                        competency: [{
                            text : "Living well from older people across communities and groups",
                            checked : false
                        },{
                            text : "Maximising health outcomes",
                            checked : false
                        },{
                            text : "Communicating effectively",
                            checked : false
                        },{
                            text : "Facilitating transitions in care",
                            checked : false
                        },{
                            text : "Facilitating choices within legal and ethical frameworks",
                            checked : false
                        },{
                            text : "Partnering with family carers",
                            checked : false
                        },{
                            text : "Promoting mental health and psychological well-being",
                            checked : false
                        },{
                            text : "Providing evidence-based dementia care",
                            checked : false
                        },{
                            text : "Providing optimal pain management",
                            checked : false
                        },{
                            text : "Providing palliative care",
                            checked : false
                        },{
                            text : "Enabling access to technology",
                            checked : false
                        }],
                        mentor_notify_date : ""
                    });
        };
          /**
         *
         */
        vm.saveStage = function (stage) {

            if (stage == 1) {
                vm.stagesList.stage1.rights.mentee.readOnly = true;
            } else if (stage == 2) {
                vm.stagesList.stage2.rights.mentee.readOnly = true;
            } else if (stage == 3) {
                vm.stagesList.stage3.rights.mentee.readOnly = true;
            }

            apiService.serviceRequest({
                    method: 'POST',
                    url: appConfig.requestURL.updateWorkBook,
                    data: {
                        menteeID: vm.user.uid,
                        stageData: vm.stagesList["stage" + vm.gst],
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
        init();

    }

})();