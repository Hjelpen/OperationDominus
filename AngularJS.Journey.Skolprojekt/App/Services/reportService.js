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

           var _createChart = function (chart) {

               return $http.post('https://localhost:44341/api/report/chart', chart)
                   .then(function (response) {
                       return response;
                   });
           };

           reportServiceFactory.createChart = _createChart;
           reportServiceFactory.getPdf = _getPdf;
           return reportServiceFactory;

       }]);
})();