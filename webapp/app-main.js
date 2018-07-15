(function () {
    "use strict";

    angular
        .module('adhere', ['ui.router', 'ngMaterial', 'ngAnimate', 'ngAria'])
        .config(config)
        .run(run);

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, $mdGestureProvider) {

        $stateProvider
            .state('app', {
                url: '/',
                templateUrl: 'modules/base/base.html',
                controller: 'mainController',
                controllerAs: 'vm'
            }).state('login', {
                url: '/login',
                params: {
                    id: undefined
                },
                templateUrl: 'modules/login/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            }).state('app.home', {
                url: 'home',
                templateUrl: 'modules/home/home.html',
                controller: 'homeController',
                controllerAs: 'vm'
            }).state('app.workbook', {
                url: 'workbook',
                templateUrl: 'modules/workbook/workbook.html',
                controller: 'workbookController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('login'); // fallback url       

        $mdGestureProvider.skipClickHijack(); // fix to mouse 'hijack' issue android

    }

    /* @ngInject */
    function run() {

    }


})();