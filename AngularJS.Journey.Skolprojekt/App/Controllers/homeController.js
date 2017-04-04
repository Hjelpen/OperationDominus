(function(){ 
    "use strict";
    angular.module('AngularJourneyApp')
        .controller('homeController', ['$scope', '$location', 'loginService', function ($scope, $location, loginService) {

            $scope.loginData = {
                userName: "",
                password: ""
            };

            $scope.message = "";

            $scope.login = function () {

                loginService.login($scope.loginData).then(function (response) {

                    $location.path('/mainpage');

            },
               function (err) {
                   $scope.message = err.error_description;
                });
          };
    }]);
})();