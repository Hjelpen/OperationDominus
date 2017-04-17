(function(){
    angular.module('AngularJourneyApp')
        .controller('mainpageController', ['$scope', 'tripService', function ($scope, tripService) {

            $scope.trips = [];

            $scope.getAllTrips = function () {
                tripService.getAllTrips().then(function (response) {
                    $scope.trips = response.data;
                },
                 function (response) {
                     (response)
                 });
            }

    }]);
})();