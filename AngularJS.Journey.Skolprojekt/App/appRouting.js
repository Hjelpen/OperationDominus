(function () {

angular.module('AngularJourneyApp').
    config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/App/Views/login.html"
    });

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/App/Views/home.html"
    });

    $routeProvider.when("/register", {
        controller: "registerController",
        templateUrl: "/App/Views/register.html"
    });

    $routeProvider.when("/mainpage", {
        controller: "mainpageController",
        templateUrl: "/App/Views/mainpage.html"
    });

    $routeProvider.when("/vehicle", {
        controller: "vehicleController",
        templateUrl: "/App/Views/vehicle.html"
    });

    $routeProvider.when("/trip", {
        controller: "tripController",
        templateUrl: "/App/Views/trip.html"
    });

    $routeProvider.when("/report", {
        controller: "reportController",
        templateUrl: "/App/Views/report.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

    });
})();