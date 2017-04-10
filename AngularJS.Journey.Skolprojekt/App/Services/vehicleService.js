(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('vehicleService', ['$http', function ($http) {

           var vehicleServiceFactory = {};

           var _saveVehicle = function (addvehicle) {

               return $http.post('https://localhost:44341/api/vehicle', addvehicle)
                   .then(function (response) {
                       return response;
                   });
           };

           vehicleServiceFactory.saveVehicle = _saveVehicle;
           return vehicleServiceFactory;

       }]);
})();