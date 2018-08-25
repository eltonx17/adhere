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
        };
        init();

    }

})();