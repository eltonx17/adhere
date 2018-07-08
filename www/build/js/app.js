(function () {
    "use strict";

    config.$inject = ["$stateProvider", "$urlRouterProvider", "$mdGestureProvider"];
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
            })
            .state('login', {
                url: '/login',
                params: {
                    id: undefined
                },
                templateUrl: 'modules/login/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .state('app.home', {
                url: 'home',
                templateUrl: 'modules/home/home.html',
                controller: 'homeController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('login'); // fallback url       

        $mdGestureProvider.skipClickHijack(); // fix to mouse 'hijack' issue android

    }

    /* @ngInject */
    function run() {

    }


})();
/**
 * Adhere
 **/
(function () {
    "use strict";

    mainController.$inject = ["$scope", "$state", "$window", "$timeout", "$transitions", "$http", "appConfig", "apiService", "$rootScope", "$mdDialog"];
    angular
        .module('adhere')
        .controller('mainController', mainController);

    /* ngInject */
    function mainController($scope, $state, $window, $timeout, $transitions, $http, appConfig, apiService, $rootScope, $mdDialog) {
        var vm = this;
        vm.online = true;

        /**
         * exection starts here
         **/
        function init() {

            /** set the center div height **/
            vm.setCenterheight();

            /** set the center div height on resize **/
            angular.element($window).bind('resize', function () {
                if (!vm.adjusting)
                    $timeout(function () {
                        vm.adjusting = true;
                        vm.setCenterheight();
                    }, 100)
            });
        };

        /**
         * set the center div height
         **/
        vm.setCenterheight = function () {
            if (!document.getElementsByTagName('header'))
                return; // retruns if view is not rendereded(login page)

            var html = document.documentElement,
                hHeight = (document.getElementsByTagName('header')[0]) ? document.getElementsByTagName('header')[0].offsetHeight : 0,
                centerContent = $('#center-wrapper');

            if (centerContent) { 
                centerContent.css("minHeight", html.clientHeight - (100) + "px");
            }
            vm.adjusting = false;
        };

        /**
         * logout action
         **/
        vm.logout = function () {
            var confirm = $mdDialog.confirm()
                .title('Confirm logout?')
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function () {
                apiService.logout();
            }, function () {

            });
        };


        init();

    }

})();
//set global configuration of application and it can be accessed by injecting appConstants in any modules

(function () {
    'use strict';

    angular.module('adhere')
        .service('appConfig', appConfig);

    /** @ngInject */
    function appConfig() {
        var $self = this;

        $self.title = "Ad-built Plus"; // app name     
        $self.version = "1.0.0";

        $self.requestURL = {
            login: 'api/security/loginwithaccount'
        };

    }
})();
(function () {
    apiService.$inject = ["$rootScope", "$http", "$q", "$state", "appConfig", "$mdToast", "$document", "$rootScope", "$timeout"];
    angular
        .module('adhere')
        .service('apiService', apiService);

    function apiService($rootScope, $http, $q, $state, appConfig, $mdToast, $document, $rootScope, $timeout) {

        var $self = this;

        /**
         * function to place http request
         */
        $self.serviceRequest = function (config, success, fail) {

            var requestParams = angular.merge({

                method: config.method || "GET",
                url: appConfig.getbaseURL() + config.url,
                params: config.params || {},
                data: config.data || {}
            }, config.addOns);

            var request = $http(requestParams);

            request.then(function successCallback(response) {
                if (response && response.status == 200) {
                    if (success)
                        success(response.data);
                    else {
                        if (fail)
                            fail(response.data);
                    }
                } else {
                    if (fail)
                        fail(response.data);
                }
            }, function errorCallback(response) {
                if (fail)
                    fail(response.data);
            });
        };

        /**
         * function to place async service request
         */
        $self.asyncServiceRequest = function (params) {
            var deferred = $q.defer(); // creating the promise object

            serviceRequest(params, function (response) {
                deferred.resolve(response); // resolving the promise
            }, function (response) {
                deferred.reject(response); // rejecting the promise
            });

            return deferred.promise; // returning the promise object
        };

        /**
         * to toasts to the user
         */
        $self.toast = function (text, param) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(text || 'Take2')
                .hideDelay(1500)
            );
        };

        /**
         * function to log user out and clear session settings
         */
        $self.logout = function (param) {
            $state.go('login'); // navigate to login
        };
    }
})();
/**
 * Adhere
 **/
(function () {
    "use strict";

    homeController.$inject = ["$scope", "appConfig", "$timeout", "apiService", "$rootScope", "$state"];
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
/**
 * Author:Adhere
 **/
(function () {
    "use strict";

    loginController.$inject = ["$scope", "$state", "appConfig", "$stateParams", "apiService", "$timeout", "$mdDialog", "$http", "$rootScope"];
    angular
        .module('adhere')
        .controller('loginController', loginController);

    /* ngInject */
    function loginController($scope, $state, appConfig, $stateParams, apiService, $timeout, $mdDialog, $http, $rootScope) {
        var vm = this;


        function init() {

            vm.appTitle = appConfig.title; // binds app title from config            

            $timeout(function () {
                vm.showScreen = true;
            });

            // binds the resize event
            angular.element(window).bind('resize', function () {
                if (document.activeElement) {
                    $timeout(function () {
                        document.activeElement.scrollIntoView(); // to bring the focus element to view when keyboard is on
                    }, 200);
                    document.activeElement.scrollIntoView(); // to bring the focus element to view when keyboard is on
                }
            });
        };

        /**
         * login function
         **/
        vm.login = function (ev) {

            if (ev)
                ev.stopPropagation();

            $state.go("app.home")
        };


        init();

    }

})();