/**
 * Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('homeController', homeController);

    /* ngInject */
    function homeController($scope, appConfig, $timeout, apiService, $rootScope, $state) {
        var vm = this;


        function init() {
            vm.appTitle = appConfig.title; // binds app title from config
        };

        vm.showForm = function (action) {
            if (action) {
                $("#dashboard").hide();
                $("#form_wrapper").slideToggle();
            } else {
                $("#form_wrapper").hide();
                $("#dashboard").slideToggle();
            }
        };

        init();

    }

})();