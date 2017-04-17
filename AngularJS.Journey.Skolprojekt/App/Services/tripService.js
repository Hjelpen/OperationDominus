(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('tripService', ['$http', function ($http) {

           var tripServiceFactory = {};

           var _addTrip = function (trip) {

               return $http.post('https://localhost:44341/api/Trips', trip)
                   .then(function (response) {
                   return response;
               });
           };

           var _getAllTrips = function () {
               return $http.get('https://localhost:44341/api/Trips')
                   .then(function (response) {
                       return response;
                   });
           }

           tripServiceFactory.addTrip = _addTrip;
           tripServiceFactory.getAllTrips = _getAllTrips;
           return tripServiceFactory;

       }]);
})();