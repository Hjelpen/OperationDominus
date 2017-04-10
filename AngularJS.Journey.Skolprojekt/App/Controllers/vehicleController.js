(function () {
    angular.module('AngularJourneyApp')
        .controller('vehicleController', ['$scope', 'vehicleService', function ($scope, vehicleService) {

            $scope.message = "";

            $scope.newVehicle = {
                LicensNumber: "",
                Status: true           
            };

            $scope.registerVehicle = function () {

                vehicleService.saveVehicle($scope.newVehicle).then(function (response) {

                    $scope.message = "Bil " + $scope.LicensNumber + "tillagd."
                },
                 function (response) {
                     $scope.message = "Misslyckades att spara bil";
                 });
            };
        }]);
})();