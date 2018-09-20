/**
 * Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('menteeController', menteeController);

    /* ngInject */
    function menteeController($scope, appConfig, $timeout, apiService, $rootScope, $state, $mdDialog) {
        var vm = this;


        function init() {
            vm.user = window.localStorage.getItem('user') ? angular.fromJson(window.localStorage.getItem('user')) : undefined;
            vm.appTitle = appConfig.title; // binds app title from config
            vm.getComments();
            vm.stageStatus = {
                1: "Step 1/5",
                2: "Completed Step 1/5",
                3: "Completed Step 2/5",
                4: "Completed Step 3/5",
                5: "Completed Step 4/5",
                6: "Completed"
            };
            vm.stagePercentage = {
                1: 0,
                2: 20,
                3: 40,
                4: 60,
                5: 80,
                6: 100
            };
            vm.showDialog();
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
        /**
         *
         */
        vm.showDialog = function () {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                template: '<md-dialog aria-label="List dialog">' +
                    '  <md-dialog-content>' +
                    '    <md-list>' +
                    '      <md-list-item ng-repeat="item in items">' +
                    '       <p>Number {{item}}</p>' +
                    '      ' +
                    '    </md-list-item></md-list>' +
                    '  </md-dialog-content>' +
                    '  <md-dialog-actions>' +
                    '    <md-button ng-click="closeDialog()" class="md-primary">' +
                    '      Close Dialog' +
                    '    </md-button>' +
                    '  </md-dialog-actions>' +
                    '</md-dialog>',
                locals: {
                    items: $scope.items
                },
                controller: DialogController
            });

            function DialogController($scope, $mdDialog, items) {
                $scope.items = [1,2,43];
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            }
        };

        init();

    }

})();