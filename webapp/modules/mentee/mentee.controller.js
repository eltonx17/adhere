/**
 * Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('menteeController', menteeController);

    /* ngInject */
    function menteeController($scope, appConfig, $timeout, apiService, $rootScope, $state) {
        var vm = this;


        function init() {
            vm.user = window.localStorage.getItem('user') ? angular.fromJson(window.localStorage.getItem('user')) : undefined;
            vm.appTitle = appConfig.title; // binds app title from config
            vm.getComments();
            vm.stageStatus = {           
                1 : "Step 1/5",
                2 : "Completed Step 1/5",
                3 : "Completed Step 2/5",
                4 : "Completed Step 3/5",
                5 : "Completed Step 4/5",
                6 : "Completed"
            };
            vm.stagePercentage = {           
                1 : 0,
                2 : 20,
                3 : 40,
                4 : 60,
                5 : 80,
                6 : 100
            };
        };

        vm.getComments = function () {
            vm.commentList = [{
                comment: "Log in with Adhere",
                from: "Login",
                pic: "",
                time: new Date(),
                id: "123"
            }, {
                comment: "Registered with Adhere",
                from: "Register",
                pic: "",
                time: new Date(),
                id: "864"
            }];
        };
        vm.showReplySection = function (id) {
            $("#comment-reply-" + id).slideToggle();
        }

        init();

    }

})();