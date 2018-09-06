/**
 * Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('adminCompetencyController', adminCompetencyController);

    /* ngInject */
    function adminCompetencyController($scope, appConfig, $timeout, apiService, $rootScope, $state) {
        var vm = this;


        function init() {
            vm.appTitle = appConfig.title; // binds app title from config
            vm.competencyList = [];
            for (var i = 0; i < 11; i++) {
                vm.competencyList.push({
                    title: "Com " + (i + 1),
                    section: [{
                        heading: "",
                        questions: [{
                            text: ""
                        }]
                    }]
                });
            };
            vm.currentCompetency();
        };
        /**
         *
         */
        vm.currentCompetency = function (item) {
            // sent login request to server
            apiService.serviceRequest({
                    method: 'GET',
                    url: appConfig.requestURL.getCompetencyData
                }, function (response) {
                    if (response && response.error && response.error.msg) { // error from server                                                 
                        $timeout(function () {
                            vm.regoErrMsg = data.error.msg || "Something went wrong, try again.";
                        });
                    } else {
                        if (response && response.data && response.data.items && response.data.items.length > 0)
                            vm.competencyList = response.data.items;
                    }
                },
                function (fail) { // service fails
                    vm.registering = false;
                    vm.regoErr = true;
                    vm.regoErrMsg = "Something went wrong, try again.";
                });
        };
        /**
         *
         */
        vm.addSection = function (item) {
            item.section.push({
                heading: "",
                questions: [{
                    text: ""
                        }]
            });
            $timeout();
        };
        /**
         *
         */
        vm.addQuestion = function (item) {
            item.questions.push({
                text: ""
            });
            $timeout();
        };
        /**
         *
         */
        vm.save = function (item) {
            swal({
                    title: "Are you sure?",
                    text: "Saving would overwrite the existing version and this action cannot be reversed.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        // sent login request to server
                        var comData = {
                            items: angular.copy(vm.competencyList),
                            rights: {
                                mentor: {
                                    readOnly: false
                                },
                                mentee: {
                                    readOnly: false
                                }
                            }
                        };
                        apiService.serviceRequest({
                                method: 'POST',
                                url: appConfig.requestURL.saveCompetencyData,
                                data: {
                                    competencyData: comData
                                }
                            }, function (data) {
                                if (data && data.error && data.error.msg) { // error from server                                                      
                                    $timeout(function () {
                                        vm.regoErrMsg = data.error.msg || "Something went wrong, try again.";
                                    });
                                } else {
                                    swal({
                                        title: "Good job!",
                                        text: "You clicked the button!",
                                        icon: "success",
                                        button: "Aww yiss!",
                                    });
                                }
                            },
                            function (fail) { // service fails
                                vm.registering = false;
                                vm.regoErr = true;
                                vm.regoErrMsg = "Something went wrong, try again.";
                            });
                    }
                });

        };
        init();

    }

})();