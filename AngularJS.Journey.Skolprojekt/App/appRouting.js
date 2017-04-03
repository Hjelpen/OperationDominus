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

    $routeProvider.otherwise({ redirectTo: "/home" });
    });

})();