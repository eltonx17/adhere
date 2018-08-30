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
            vm.competencyList = [{
                title: "Com 1",
                questions: []
            }, {
                title: "Com 2",
                questions: []
            }, {
                title: "Com 3",
                questions: []
            }, {
                title: "Com 4",
                questions: []
            }, {
                title: "Com 5",
                questions: []
            }, {
                title: "Com 6",
                questions: []
            }, {
                title: "Com 7",
                questions: []
            }, {
                title: "Com 8",
                questions: []
            }, {
                title: "Com 9",
                questions: []
            }, {
                title: "Com 10",
                questions: []
            }, {
                title: "Com 11",
                questions: []
            }, ]
        };
        /**
         *
         */
        vm.addQuestion = function (item) {
            item.questions.push({

            });
            console.log(angular.toJson(vm.competencyList))
        };
        /**
         *
         */
        vm.save = function (item) {
            // sent login request to server
            apiService.serviceRequest({
                    method: 'POST',
                    url: appConfig.requestURL.getCompetencyData,
                    data: {
                        competencyData: vm.competencyList
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
        };
        init();

    }

})();