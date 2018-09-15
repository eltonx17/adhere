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
            if ($stateParams.menteeId) {
                vm.menteeId = $stateParams.menteeId;
                vm.currentStageInfo($stateParams.menteeId);
                vm.stageName = {
                    1: "Mentor - Mentee Agreement",
                    2: "Self - Assesments",
                    3: "Action Plan",
                    4: "Summary of Evidence",
                    5: "Feedback"
                };
            } else {
                $state.go("app.mentor");
            }
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
                                stage1: (resp.stage1) ? resp.stage1 : null,
                                stage2: resp.stage2,
                                stage3: (resp.stage3) ? resp.stage3 : null,
                                stage4: (resp.stage4) ? resp.stage4 : null,
                                stage5: (resp.stage5) ? resp.stage5 : null
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
            swal({
                title: "Confirm to approve Stage - " + vm.gst + " details?",
                text: "This action cannot be reversed, are you sure to continue.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {

                    if (stage == 1) {
                        vm.stagesList.stage1.rights.mentor.readOnly = true;
                        vm.stagesList.stage1.rights.mentee.readOnly = true;
                        vm.stagesList.stage1.changeRequest = false;
                    } else if (stage == 2) {
                        vm.stagesList.stage2.rights.mentor.readOnly = true;
                        vm.stagesList.stage2.rights.mentee.readOnly = true;
                        vm.stagesList.stage2.changeRequest = false;
                    } else if (stage == 3) {
                        vm.stagesList.stage3.rights.mentor.readOnly = true;
                        vm.stagesList.stage3.rights.mentee.readOnly = true;
                        vm.stagesList.stage3.changeRequest = false;
                    } else if (stage == 4) {
                        vm.stagesList.stage4.rights.mentor.readOnly = true;
                        vm.stagesList.stage4.rights.mentee.readOnly = true;
                        vm.stagesList.stage4.changeRequest = false;
                    } else if (stage == 5) {
                        vm.stagesList.stage5.rights.mentor.readOnly = true;
                        vm.stagesList.stage5.rights.mentee.readOnly = true;
                        vm.stagesList.stage5.changeRequest = false;
                    }

                    apiService.serviceRequest({
                            method: 'POST',
                            url: appConfig.requestURL.updateWorkBook,
                            data: {
                                menteeID: vm.menteeId,
                                stageData: vm.stagesList["stage" + vm.gst],
                                gstData: vm.gst,
                                usertype: vm.user.usertype,
                                review: 0
                            }
                        }, function (response) {
                            if (response && response.error && response.error.msg) { // error from server                                                 
                                $timeout(function () {
                                    vm.regoErrMsg = response.error.msg || "Something went wrong, try again.";
                                });
                            } else {
                                swal({
                                    title: "Done!",
                                    text: "Step approved successfully.",
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
        /**
         *
         */
        vm.requestChange = function (stage) {
            swal({
                title: "Confirm to request change for Step - " + vm.gst + " details?",
                text: "This action cannot be reversed, are you sure to continue.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {

                    if (stage == 1) {
                        vm.stagesList.stage1.rights.mentor.readOnly = true;
                        vm.stagesList.stage1.rights.mentee.readOnly = false;
                        vm.stagesList.stage1.changeRequest = true;
                    } else if (stage == 2) {
                        vm.stagesList.stage2.rights.mentor.readOnly = true;
                        vm.stagesList.stage2.rights.mentee.readOnly = false;
                        vm.stagesList.stage2.changeRequest = true;
                    } else if (stage == 3) {
                        vm.stagesList.stage3.rights.mentor.readOnly = true;
                        vm.stagesList.stage3.rights.mentee.readOnly = false;
                        vm.stagesList.stage3.changeRequest = true;
                    } else if (stage == 4) {
                        vm.stagesList.stage4.rights.mentor.readOnly = true;
                        vm.stagesList.stage4.rights.mentee.readOnly = false;
                        vm.stagesList.stage4.changeRequest = true;
                    } else if (stage == 5) {
                        vm.stagesList.stage5.rights.mentor.readOnly = true;
                        vm.stagesList.stage5.rights.mentee.readOnly = false;
                        vm.stagesList.stage5.changeRequest = true;
                    }

                    apiService.serviceRequest({
                            method: 'POST',
                            url: appConfig.requestURL.updateWorkBook,
                            data: {
                                menteeID: vm.menteeId,
                                stageData: vm.stagesList["stage" + vm.gst],
                                gstData: vm.gst,
                                usertype: vm.user.usertype,
                                review: 1
                            }
                        }, function (response) {
                            if (response && response.error && response.error.msg) { // error from server                                                 
                                $timeout(function () {
                                    vm.regoErrMsg = response.error.msg || "Something went wrong, try again.";
                                });
                            } else {
                                swal({
                                    title: "Done!",
                                    text: "You have request mentee to review the step.",
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
        vm.openAllAccordion = function (item, action) {
            vm.openAllAccordion = function (item, action) {
                if (item == "sa") {
                    for (var i = 0; i < vm.stagesList.stage2.items.length; i++)
                        vm.stagesList.stage2.items[i].show = action;
                    $timeout();
                } else if (item == "es") {
                    $timeout(function () {
                        for (var i = 0; i < vm.stagesList.stage4.items.length; i++)
                            vm.stagesList.stage4.items[i].show = action;
                    });
                }
            };
        };

        init();

    }

})();