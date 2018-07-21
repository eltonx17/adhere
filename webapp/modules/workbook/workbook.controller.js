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
            vm.stageList =[{
                title :"Stage 1",
                active:  true
            },{
                title :"Stage 2",
                active:  false
            },{
                title :"Stage 3",
                active:  false
            },{
                title :"Stage 4",
                active:  false
            },{
                title :"Stage 5",
                active:  false
            },{
                title :"Stage 6",
                active:  false
            }]
        };

        init();

    }

})();