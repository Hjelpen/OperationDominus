(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('vehicleService', ['$http', function ($http) {

           var vehicleServiceFactory = {};

           var _saveVehicle = function (addvehicle) {

               return $http.post('https://localhost:44341/api/Vehicles', addvehicle)
                   .then(function (response) {
                       return response;
                   });
           };

           var _getAllVehicles = function () {
               return $http.get('https://localhost:44341/api/Vehicles')
                   .then(function (response) {
                       return response;
                   });
           }

           vehicleServiceFactory.saveVehicle = _saveVehicle;
           vehicleServiceFactory.getSavedVehicles = _getAllVehicles;
           return vehicleServiceFactory;

       }]);
})();