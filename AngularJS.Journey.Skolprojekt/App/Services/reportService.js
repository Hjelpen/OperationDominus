(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('reportService', ['$http', function ($http) {

           var reportServiceFactory = {};

           var _getPdf = function (pdf) {

               return $http.post('https://localhost:44341/api/report', pdf)
                   .then(function (response) {
                       return response;
                   });
           };


           reportServiceFactory.getPdf = _getPdf;
           return reportServiceFactory;

       }]);
})();