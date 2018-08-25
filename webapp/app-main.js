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
                    email: undefined
                },
                templateUrl: 'modules/login/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            }).state('register', {
                url: '/register',
                templateUrl: 'modules/register/register.html',
                controller: 'registerController',
                controllerAs: 'vm'
            }).state('app.admin', {
                url: 'admin/home',
                templateUrl: 'modules/admin/admin.html',
                controller: 'adminController',
                controllerAs: 'vm'
            }).state('app.adminCompetency', {
                url: 'admin/competency',
                templateUrl: 'modules/admin/competency/competency.html',
                controller: 'adminCompetencyController',
                controllerAs: 'vm'
            }).state('app.mentee', {
                url: 'mentee/home',
                templateUrl: 'modules/mentee/mentee.html',
                controller: 'menteeController',
                controllerAs: 'vm'
            }).state('app.workbook', {
                url: 'mentee/workbook',
                templateUrl: 'modules/mentee/workbook/workbook.html',
                controller: 'workbookController',
                controllerAs: 'vm'
            }).state('app.mentor', {
                url: 'mentor/home',
                templateUrl: 'modules/mentor/mentor.html',
                controller: 'mentorController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('login'); // fallback url       

        $mdGestureProvider.skipClickHijack(); // fix to mouse 'hijack' issue android

    }

    /* @ngInject */
    function run() {

    }


})();