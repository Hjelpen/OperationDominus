(function () {
    angular.module('AngularJourneyApp')
        .controller('reportController', ['$scope', 'vehicleService', 'reportService', function ($scope, vehicleService, reportService) {

            $scope.data = [];
            $scope.labels = ["Korta resor", "Mellan resor", "Långa resor"];

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

                $scope.createChart = function () {
                    reportService.createChart($scope.VehicleDate).then(function (response) {
                        $scope.data = [];
                        $scope.labels = [];
                        var data = response.data;
                        console.log(data)
                       
                        var trips = { short: 0, medium: 0, long: 0 };
                        angular.forEach(data, function (value, key) {
                            if(value.distanceTraveled <= 20)
                            {
                                trips.short++;
                            }
                            if(value.distanceTraveled >= 21 && value.distanceTraveled <= 50)
                            {
                                trips.medium++;
                            }
                            if(value.distanceTraveled >= 51)
                            {
                                trips.long++;
                            }
                        })

                        $scope.data = [trips.short, trips.medium, trips.long];
                        $scope.labels = ["0-20km", "21-50km", "50km+"];

                        console.log(trips)


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