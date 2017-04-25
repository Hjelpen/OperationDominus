(function () {
    angular.module('AngularJourneyApp')
        .controller('reportController', ['$scope', 'vehicleService', 'reportService', function ($scope, vehicleService, reportService) {

                $scope.vehicles = [];

                $scope.VehicleDate = {
                    Vehicle: "",
                    Date1: "",
                    Date2: ""
                }

                $scope.getReport = function () {
                    reportService.getPdf($scope.VehicleDate).then(function (response) {

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
   }]);
})();