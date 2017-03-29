(function(){
angular.module('AngularJourneyApp').
    config(function ($routeProvider) {

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/App/Views/login.html"
    });

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/App/Views/home.html"
    });
 
    $routeProvider.otherwise({ redirectTo: "/home" });
    });
})();