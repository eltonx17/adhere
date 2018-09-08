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
        };

        vm.getComments = function () {
            /*vm.commentList = [{
                comment: "This is a test comment from Nidhin",
                from: "Nidhin",
                pic: "",
                time: new Date(),
                id: "123"
            }, {
                comment: "This is a test comment from Sourabh",
                from: "Sourabh",
                pic: "",
                time: new Date(),
                id: "864"
            }];*/
        };
        vm.showReplySection = function (id) {
            $("#comment-reply-" + id).slideToggle();
        }

        init();

    }

})();