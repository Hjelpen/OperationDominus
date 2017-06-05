(function () {
    angular.module('AngularJourneyApp')
        .controller('vehicleController', ['$scope', '$window', 'vehicleService', '$http', 'localStorageService', function ($scope, $window, vehicleService, $http, localStorageService) {

            $scope.vehicles = [];
            defaultVehicle = localStorage.getItem("DefaultVehicle");

            $scope.newVehicle = {
                LicensNumber: "",
                Status: true
            };

            $scope.getAllVehicles = function () {
                vehicleService.getSavedVehicles().then(function (response) {
                    $scope.vehicles = response.data
                },
                 function (response) {
                     (response)
                 });
            };

            $scope.registerVehicle = function () {

                vehicleService.saveVehicle($scope.newVehicle).then(function (response) {

                    $scope.newVehicle.LicensNumber = null;
                    $scope.getAllVehicles();
                },
                 function (response) {
                     (response)
                 });
            };

            $scope.defaultVehicle = function (index) {
                var defaultVehicle = $scope.vehicles[index];
                $window.localStorage.removeItem('DefaultVehicle');
                $window.localStorage.setItem('DefaultVehicle', defaultVehicle.carId);

            }

            $scope.deleteVehicle = function (index) {
                if (confirm("Vill du ta bort bilen?")) {
                    $http({
                        method: 'DELETE',
                        url: 'https://localhost:44341/api/Vehicles/' + $scope.vehicles[index].carId,
                    }).then(function successCallback(response) {
                        $scope.vehicles.splice(index, 1);
                    }, function errorCallback(response) {
                        alert("Error : " + response.data.ExceptionMessage);
                    });
                }
            };

            $scope.updateVehicle = function (index) {
                $http({
                    method: 'PUT',
                    url: 'https://localhost:44341/api/Vehicles/' + $scope.vehicles[index].carId,
                }).then(function successCallback(response) {
                    $scope.vehicles.splice(index, 1);
                    $scope.getAllVehicles();
                }, function errorCallback(response) {
                    alert("Error : " + response.data.ExceptionMessage);
                });              
            };

        }]);
})();