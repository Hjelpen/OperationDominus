(function () {
    angular.module('AngularJourneyApp')
        .controller('vehicleController', ['$scope', 'vehicleService', function ($scope, vehicleService) {

            $scope.vehicles = [];

            $scope.newVehicle = {
                LicensNumber: "",
                Status: true
            };

            $scope.getAllVehicles = function () {
                vehicleService.getSavedVehicles().then(function (response) {
                    $scope.vehicles = response.data;
                },
                 function (response) {
                     (response)
                 });
            }

            $scope.registerVehicle = function () {

                vehicleService.saveVehicle($scope.newVehicle).then(function (response) {

                    $scope.newVehicle.LicensNumber = null;
                    $scope.getAllVehicles();
                },
                 function (response) {
                     (response)
                 });
            };

            $scope.deleteVehicle = function (vehicle) {
                console.log(vehicle)
                if (confirm("vill du ta bort bilen")) {
                    var getData = vehicleService.deletevehicle(vehicle).then
                        (function (response) {
                            getAllVehicles();
                        }
                    )
                };
            }
        }]);
})();