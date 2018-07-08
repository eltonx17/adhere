(function () {
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