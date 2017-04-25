(function () {
    angular.module('AngularJourneyApp')
        .controller('tripController', ['$scope', 'geoLocationService', 'tripService', 'vehicleService', 'localStorageService', function ($scope, geoLocationService, tripService, vehicleService, localStorageService) {

            $scope.vehicles = [];
            $scope.message = "";

            $scope.trip = {
                Vehicle: "",
                Date: "",
                MileageStart: "",
                MileageStop: "",
                DistanceTraveled: "",
                AdressStart: "",
                AdressStop: "",
                Erand: "",
                Notes: ""
            };

            var defaultVehicle = localStorage.getItem("DefaultVehicle");
            $scope.defaultVehicle = defaultVehicle;

            $scope.saveTrip = function () {
                tripService.addTrip($scope.trip).then(function (response) {
                    $scope.message = "Resan sparades!";
                    $scope.trip = null;
                },
                 function (response) {
                     (response)
                 });
            }

            $scope.getAllVehicles = function () {
                vehicleService.getSavedVehicles().then(function (response) {
                    $scope.vehicles = response.data;
                },
                 function (response) {
                     (response)
                 });
            }


            $scope.getStartLocation = function () {
                geoLocationService.getUserLocation();
                console.log()
            };

            $scope.getStopLocation = function () {
                geoLocationService.getUserLocation();
                console.log()
            };

        }]);
})();