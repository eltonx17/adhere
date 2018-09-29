/**
 * Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('workbookController', workbookController);

    /* ngInject */
    function workbookController($scope, appConfig, $timeout, apiService, $rootScope, $state, $http, $mdDialog) {
        var vm = this;


        function init() {
            vm.appTitle = appConfig.title; // binds app title from config
            vm.user = window.localStorage.getItem('user') ? angular.fromJson(window.localStorage.getItem('user')) : undefined;
            vm.currentStageInfo();
            vm.stageName = {
                1: "Mentor - Mentee Agreement",
                2: "Self - Assesment",
                3: "Action Plan",
                4: "Generation of Evidence",
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
                            vm.workbookid = resp.workbookid;
                            vm.gst = (resp.gst) ? parseInt(resp.gst) : 1;
                            if (vm.gst > 5)
                                vm.gst = 5;

                            vm.stageList = [{
                                title: "Step 1",
                                active: (vm.gst >= 1) ? true : false
                            }, {
                                title: "Step 2",
                                active: (vm.gst >= 2) ? true : false
                            }, {
                                title: "Step 3",
                                active: (vm.gst >= 3) ? true : false
                            }, {
                                title: "Step 4",
                                active: (vm.gst >= 4) ? true : false
                            }, {
                                title: "Step 5",
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
                                stage4: (resp.stage4) ? resp.stage4 : vm.getDefaults("stage4"),
                                stage5: (resp.stage5) ? resp.stage5 : vm.getDefaults("stage5")
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
                        menteeName: vm.user.firstname + " " + vm.user.lastname,
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
                    },
                    mentorFeedback: "",
                    changeRequest: false
                },
                stage3: {
                    items: [{
                        term: "",
                        goal: "",
                        resource: "",
                        review_date: "",
                        due_date: "",
                        relatedCom: ""
                    }],
                    rights: {
                        mentor: {
                            readOnly: false
                        },
                        mentee: {
                            readOnly: false
                        }
                    },
                    mentorFeedback: "",
                    changeRequest: false
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
                            text: "Living well from older people across communities and groups",
                            checked: false
                        }, {
                            text: "Maximising health outcomes",
                            checked: false
                        }, {
                            text: "Communicating effectively",
                            checked: false
                        }, {
                            text: "Facilitating transitions in care",
                            checked: false
                        }, {
                            text: "Facilitating choices within legal and ethical frameworks",
                            checked: false
                        }, {
                            text: "Partnering with family carers",
                            checked: false
                        }, {
                            text: "Promoting mental health and psychological well-being",
                            checked: false
                        }, {
                            text: "Providing evidence-based dementia care",
                            checked: false
                        }, {
                            text: "Providing optimal pain management",
                            checked: false
                        }, {
                            text: "Providing palliative care",
                            checked: false
                        }, {
                            text: "Enabling access to technology",
                            checked: false
                        }],
                        mentor_notify_date: ""
                    }],
                    rights: {
                        mentor: {
                            readOnly: false
                        },
                        mentee: {
                            readOnly: false
                        }
                    },
                    mentorFeedback: "",
                    changeRequest: false,
                    files: []
                },
                stage5: {
                    mentor: {
                        mentee_name: "",
                        mentee_role: "",
                        mentor_name: "",
                        mentor_role: "",
                        comments: "",
                        questions: [{
                            text: "My mentee was accessible and available",
                            answer: ""
                        }, {
                            text: "My mentee communicated regularly with me",
                            answer: ""
                        }, {
                            text: "My mentee was engaged and proactive in developing learning goals",
                            answer: ""
                        }, {
                            text: "My mentee was concerned about clinical performance and worked to improve deficiencies",
                            answer: ""
                        }, {
                            text: "My mentee contacted me regularly for feedback",
                            answer: ""
                        }, {
                            text: "My mentee utilised other resources and learning experiences",
                            answer: ""
                        }, {
                            text: "My mentee demonstrated interest/concern towards me in my quest to offer assistance",
                            answer: ""
                        }, {
                            text: "My mentee's behaviour and attitude were professional and courteous",
                            answer: ""
                        }, {
                            text: "My mentee learnt at least one important new thing from me",
                            answer: ""
                        }, {
                            text: "My mentee took into account gender, ethnic and cultural issues when interacting with me",
                            answer: ""
                        }, {
                            text: "Overall my mentee participated in the mentoring activities",
                            answer: ""
                        }, {
                            text: "I anticipate an extended future relationship with my mentee",
                            answer: ""
                        }]
                    },
                    mentee: {
                        mentee_name: vm.user.firstname + " " + vm.user.lastname,
                        mentee_role: "",
                        mentor_name: "",
                        mentor_role: "",
                        comments: "",
                        questions: [{
                            text: "My mentor was accessible and available",
                            answer: ""
                        }, {
                            text: "My mentor communicated regularly with me",
                            answer: ""
                        }, {
                            text: "My mentor assisted me in development of learning goals",
                            answer: ""
                        }, {
                            text: "My mentor assisted me with improving my clinical performance",
                            answer: ""
                        }, {
                            text: "My mentor provided helpful and thoughtful feedback",
                            answer: ""
                        }, {
                            text: "My mentor provided opportunities to me for further learning or educational experiences",
                            answer: ""
                        }, {
                            text: "My mentor was able to guide and direct me to appropriate resources",
                            answer: ""
                        }, {
                            text: "My mentor demonstrated interest/concern towards me",
                            answer: ""
                        }, {
                            text: "My mentor's behaviour and attitude are an example of professionalism",
                            answer: ""
                        }, {
                            text: "I learned at least one important new thing from my mentor",
                            answer: ""
                        }, {
                            text: "My mentor took into account gender, ethnic and cultural issues when interacting with me",
                            answer: ""
                        }, {
                            text: "My mentor provided a sounding board for my ideas, goals and aspirations",
                            answer: ""
                        }, {
                            text: "I anticipate an extended future relationship",
                            answer: ""
                        }, {
                            text: "I would recommend this mentor to others",
                            answer: ""
                        }]
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
            if (vm.stagesList.stage3.rights.mentor.readOnly)
                return;

            vm.stagesList.stage3.items.push({
                term: "",
                goal: "",
                resource: "",
                review_date: "",
                due_date: "",
                relatedCom: ""
            });
        };
        /**
         *
         */
        vm.addSummary = function () {
            if (vm.stagesList.stage4.rights.mentor.readOnly)
                return;

            vm.stagesList.stage4.items.push({
                title: "",
                date_completed: "",
                evidence_category: "",
                knowledge: "",
                skills: "",
                attitude: "",
                competency: [{
                    text: "Living well from older people across communities and groups",
                    checked: false
                        }, {
                    text: "Maximising health outcomes",
                    checked: false
                        }, {
                    text: "Communicating effectively",
                    checked: false
                        }, {
                    text: "Facilitating transitions in care",
                    checked: false
                        }, {
                    text: "Facilitating choices within legal and ethical frameworks",
                    checked: false
                        }, {
                    text: "Partnering with family carers",
                    checked: false
                        }, {
                    text: "Promoting mental health and psychological well-being",
                    checked: false
                        }, {
                    text: "Providing evidence-based dementia care",
                    checked: false
                        }, {
                    text: "Providing optimal pain management",
                    checked: false
                        }, {
                    text: "Providing palliative care",
                    checked: false
                        }, {
                    text: "Enabling access to technology",
                    checked: false
                        }],
                mentor_notify_date: ""
            });
        };
        /**
         *
         */
        vm.openAllAccordion = function (item, action) {
            if (item == "sa") {
                for (var i = 0; i < vm.stagesList.stage2.items.length; i++)
                    vm.stagesList.stage2.items[i].show = action;
                $timeout();
            } else if (item == "es") {
                for (var i = 0; i < vm.stagesList.stage4.items.length; i++)
                    vm.stagesList.stage4.items[i].show = action;
                $timeout();
            }
        };
        /**
         *
         */
        vm.onFileSelect = function (input) {
            vm.saveFile(input.files[0]);
        };
        /**
         *
         */
        vm.saveFile = function (file) {

            $mdDialog.show({
                parent: angular.element(document.body),
                template: '<md-dialog aria-label="List dialog">' +
                    '  <md-dialog-content class="p-4">' +
                    '       <b>Saving file...</b>' +
                    '  </md-dialog-content>' +
                    '</md-dialog>'
            });
            
            var fd = new FormData();
            fd.append("upload", file);

            $http({
                method: 'POST',
                url: appConfig.baseURL + appConfig.requestURL.uploadFile,
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    'Process-data': false
                },
                data: fd,
                params: {
                    menteeId: vm.user.uid,
                    workbookId: vm.workbookid
                }
            }).then(function (response) {
                    $mdDialog.hide();
                    response = response.data.data;
                    if (response && response.error && response.error.msg) { // error from server                                         
                        $timeout(function () {
                            vm.regoErrMsg = response.error.msg || "Something went wrong, try again.";
                        });
                    } else {

                        document.getElementById('evidence-upload').value = ""; // clear file input field

                        if (!vm.stagesList.stage4.files)
                            vm.stagesList.stage4.files = [];

                        vm.stagesList.stage4.files.push({
                            name: file.name,
                            path: response.filepath
                        });

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
            swal({
                title: "Are you sure to submit Stage - " + vm.gst + " details?",
                text: "This action cannot be reversed, are you sure to continue.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {

                    if (stage == 1) {
                        vm.stagesList.stage1.rights.mentee.readOnly = true;
                        vm.stagesList.stage1.rights.mentor.readOnly = (vm.user.mentorUserType == 0 || vm.user.mentorUserType == "0") ? true : false;
                        vm.stagesList.stage1.changeRequest = false;
                    } else if (stage == 2) {
                        vm.stagesList.stage2.rights.mentee.readOnly = true;
                        vm.stagesList.stage2.rights.mentor.readOnly = (vm.user.mentorUserType == 0 || vm.user.mentorUserType == "0") ? true : false;
                        vm.stagesList.stage2.changeRequest = false;
                    } else if (stage == 3) {
                        vm.stagesList.stage3.rights.mentee.readOnly = true;
                        vm.stagesList.stage3.rights.mentor.readOnly = (vm.user.mentorUserType == 0 || vm.user.mentorUserType == "0") ? true : false;
                        vm.stagesList.stage3.changeRequest = false;
                    } else if (stage == 4) {
                        vm.stagesList.stage4.rights.mentee.readOnly = true;
                        vm.stagesList.stage4.rights.mentor.readOnly = (vm.user.mentorUserType == 0 || vm.user.mentorUserType == "0") ? true : false;
                        vm.stagesList.stage4.changeRequest = false;
                    } else if (stage == 5) {
                        vm.stagesList.stage5.rights.mentee.readOnly = true;
                        vm.stagesList.stage5.rights.mentor.readOnly = (vm.user.mentorUserType == 0 || vm.user.mentorUserType == "0") ? true : false;
                        vm.stagesList.stage5.changeRequest = false;
                    }

                    apiService.serviceRequest({
                            method: 'POST',
                            url: appConfig.requestURL.updateWorkBook,
                            data: {
                                menteeID: vm.user.uid,
                                stageData: vm.stagesList["stage" + vm.gst],
                                gstData: vm.gst,
                                usertype: (vm.user.mentorUserType == 0 || vm.user.mentorUserType == "0") ? 1 : vm.user.usertype,
                                review: 0,
                            }
                        }, function (response) {
                            if (response && response.error && response.error.msg) { // error from server                                         
                                $timeout(function () {
                                    vm.regoErrMsg = response.error.msg || "Something went wrong, try again.";
                                });
                            } else {

                                if (vm.user.mentorUserType == 0 || vm.user.mentorUserType == "0") // independent mentee 
                                    vm.currentStageInfo();

                                swal({
                                    title: "Done!",
                                    text: "Data saved successfully.",
                                    icon: "success",
                                    button: "Okay",
                                });
                            }
                        },
                        function (fail) { // service fails                    
                            vm.regoErr = true;
                            vm.regoErrMsg = "Something went wrong, try again.";
                        });
                }
            });

        };

        init();

    }

})();