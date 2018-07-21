/**
 * Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('adminHomeController', adminHomeController);

    /* ngInject */
    function adminHomeController($scope, appConfig, $timeout, apiService, $rootScope, $state) {
        var vm = this;

        function init() {
            vm.appTitle = appConfig.title; // binds app title from config
            vm.getMentePList();
        };

        vm.getMentePList = function () {
            vm.progressList = [{
                stageInfo: "Stage 1/6",
                from : "Nidhin",
                pic : "",
                time : new Date(),
                id : "123"
            },{
                 stageInfo: "Stage 3/6",
                from : "Sourabh",
                pic : "",
                time : new Date(),
                id : "864"
            }];
        };
        
        vm.showReplySection = function(id){
            $("#comment-reply-"+id).slideToggle();
        }

        init();

    }

})();