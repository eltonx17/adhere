//set global configuration of application and it can be accessed by injecting appConstants in any modules

(function () {
    'use strict';

    angular.module('adhere')
        .service('appConfig', appConfig);

    /** @ngInject */
    function appConfig() {
        var $self = this;

        $self.title = "Adhere"; // app name     
        $self.version = "1.0.0";
        $self.baseURL = 'services/'; // app service URL  
        $self.requestURL = {
            login: 'login/login.php',
            mentorList: 'register/mentorList.php',
            register: 'register/register.php',
            adminDashInfo: 'admin/adminStats.php',
            mentorDashInfo: 'mentor/mentorStats.php',
            toggleUserStatus: 'admin/toggleStatus.php',
            toggleMenteeStatus: 'mentor/toggleStatus.php',
            getCompetencyData: 'admin/competency/competencyGet.php',
            saveCompetencyData: 'admin/competency/competencyData.php',
            currentMenteeStageInfo: 'admin/competency/menteeStageDetails.php',
            updateWorkBook: 'admin/competency/competencyUpdate.php',
            uploadFile: 'admin/competency/upload.php'
        };

    }
})();