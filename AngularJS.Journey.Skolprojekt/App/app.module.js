(function(){
    angular.module('AngularJourneyApp', ['ngRoute', 'LocalStorageModule']);

    angular.module('AngularJourneyApp').run(['loginService', function (loginService) {
        loginService.fillAuthData();
    }]);

    angular.module('AngularJourneyApp').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });
})();