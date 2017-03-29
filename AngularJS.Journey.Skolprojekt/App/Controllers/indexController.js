(function(){
    angular.module('AngularJourneyApp')
        .controller('indexController', ['$scope', function ($scope) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    $scope.authentication = authService.authentication;

}]);
})();