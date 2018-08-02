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
            }).state('app.adminHome', {
                url: 'adminHome',
                templateUrl: 'modules/adminHome/adminHome.html',
                controller: 'adminHomeController',
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
/**
 * Adhere
 **/
(function () {
    "use strict";

    adminHomeController.$inject = ["$scope", "appConfig", "$timeout", "apiService", "$rootScope", "$state"];
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
            vm.user = window.localStorage.getItem('user') ? angular.fromJson(window.localStorage.getItem('user')) : undefined;

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
            vm.currentNavIdx = 0;
            vm.setNav();
        };
        /**
         * set the center div height
         **/
        vm.setNav = function () {
            if (vm.user.type == "admin") {
                vm.navList = [{
                    title: "Home",
                    active: true,
                    href: "app.home"
            }];
            } else {
                vm.navList = [{
                    title: "Home",
                    active: true,
                    href: "app.home"
            }, {
                    title: "WorkBook",
                    active: false,
                    href: "app.workbook"
            }];
            }
        };
        /**
         *
         */
        vm.changeNavigation = function (item, index) {
            vm.navList[vm.currentNavIdx].active = false;
            vm.currentNavIdx = index;
            item.active = true;
            $state.go(item.href);
            $timeout();
        }
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
            apiService.logout();
            return;
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
        $self.baseURL = 'services/'; // app service URL  
        $self.requestURL = {
            login: 'login/login.php'
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
                url: appConfig.baseURL + config.url,
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
            vm.getComments();
        };

        vm.getComments = function () {
            vm.commentList = [{
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
            }];
        };
        vm.showReplySection = function (id) {
            $("#comment-reply-" + id).slideToggle();
        }

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
            vm.formData = {};

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

            if (vm.formData.username && vm.formData.password) {
                var userInfo = {};
                // sent login request to server
                apiService.serviceRequest({
                        method: 'POST',
                        url: appConfig.requestURL.login,
                        params: {
                            email: vm.formData.username,
                            password: vm.formData.password
                        }
                    }, function (data) {

                        if (data && data.error) { // error from server
                            apiService.toast(data.error.message, {
                                type: 'f'
                            });
                            vm.logging = false;
                            vm.formData.password = undefined;
                        } else {

                        }
                    },
                    function (fail) { // service fails
                        vm.logging = false;
                    });
                if (vm.formData.username == "admin") {
                    userInfo.type = "admin";
                    window.localStorage.setItem('user', angular.toJson(userInfo));
                    $state.go("app.adminHome")
                } else {
                    userInfo.type = "user";
                    window.localStorage.setItem('user', angular.toJson(userInfo));
                    $state.go("app.home")
                }
            }
        };


        init();

    }

})();
/**
 * Adhere
 **/
(function () {
    "use strict";

    workbookController.$inject = ["$scope", "appConfig", "$timeout", "apiService", "$rootScope", "$state"];
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