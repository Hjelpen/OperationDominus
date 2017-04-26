(function () {
    angular.module('AngularJourneyApp')
        .controller('tripController', ['$scope', '$window', 'geoLocationService', 'tripService', 'vehicleService', 'localStorageService', function ($scope, $window, geoLocationService, tripService, vehicleService, localStorageService) {

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
                    $scope.Notes = "";
                },
                 function (response) {
                     (response)
                 });
            }

            $scope.getAllVehicles = function () {
                var defaultVehicle = $window.localStorage.getItem('DefaultVehicle');
                $scope.defaultVehicle = defaultVehicle;
                vehicleService.getSavedVehicles().then(function (response) {
                    var array = [];
                    response.data.forEach(function (element) {
                        if ($scope.defaultVehicle && element.carId == $scope.defaultVehicle) {
                            $scope.trip.Vehicle = element.carId;
                            array.unshift(element);
                        } else {
                            array.push(element);
                        }
                    });
                    $scope.vehicles = array;
                },
                 function (response) {
                     (response)
                 });
            }


            $scope.getStartLocation = function () {
                geoLocationService.getUserLocation(function (address) {
                    $scope.trip.AdressStart = address;
                    $scope.$digest();
                });
            };

            $scope.getStopLocation = function () {
                geoLocationService.getUserLocation(function (address) {
                    $scope.trip.AdressStop = address;
                    $scope.$digest();
                });
            };

        }]);
})();