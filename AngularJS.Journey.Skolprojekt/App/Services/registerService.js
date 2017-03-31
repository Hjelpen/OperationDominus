(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('registerService', ['$http', function ($http) {

           var registerServiceFactory = {};

           var _saveRegistration = function (registration) {

               return $http.post('https://localhost:44341/api/account/register', registration)
                   .then(function (response) {
                   return response;
               });
           };

           registerServiceFactory.saveRegistration = _saveRegistration;
           return registerServiceFactory;

       }]);
})();