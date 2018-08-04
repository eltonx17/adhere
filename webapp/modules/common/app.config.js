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
            login: 'login/login.php',
            mentorList: 'mentorList/mentorList.php',
            register: 'register/register.php'
        };

    }
})();