(function () {
    angular.module('AngularJourneyApp')
        .controller('tripController', ['$scope', 'geoLocationService', 'tripService', 'vehicleService', function ($scope, geoLocationService, tripService, vehicleService) {

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
                $scope.AdressStart = geoLocationService.getUserLocation();
                console.log($scope.AdressStart)
                },
                 function (error) {
                     console.log(error)
                 }

            $scope.getStopLocation = function () {
                $scope.AdressStop = geoLocationService.getUserLocation();
                console.log($scope.AdressStop)
            },
                 function (error) {
                     console.log(error)
                 }
        }]);
})();