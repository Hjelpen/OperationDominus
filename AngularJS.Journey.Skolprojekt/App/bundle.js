(function () {
    angular.module('AngularJourneyApp', ['ngRoute', 'LocalStorageModule', 'chart.js']);

    angular.module('AngularJourneyApp').run(['loginService', function (loginService) {
        loginService.fillAuthData();
    }]);

    angular.module('AngularJourneyApp').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    }]);
})();
(function () {

angular.module('AngularJourneyApp').
    config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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

    $routeProvider.when('/support', {
        templateUrl: 'App/views/support.html',
        controller: 'supportController',
        controllerAs: 'vm'
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

    }]);
})();
(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('vehicleService', ['$http', function ($http) {

           var vehicleServiceFactory = {};

           var _saveVehicle = function (addvehicle) {

               return $http.post('https://localhost:44341/api/Vehicles', addvehicle)
                   .then(function (response) {
                       return response;
                   });
           };

           var _getAllVehicles = function () {
               return $http.get('https://localhost:44341/api/Vehicles')
                   .then(function (response) {
                       return response;
                   });
           }


           vehicleServiceFactory.saveVehicle = _saveVehicle;
           vehicleServiceFactory.getSavedVehicles = _getAllVehicles;
           return vehicleServiceFactory;

       }]);
})();
(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('tripService', ['$http', function ($http) {

           var tripServiceFactory = {};

           var _addTrip = function (trip) {

               return $http.post('https://localhost:44341/api/Trips', trip)
                   .then(function (response) {
                   return response;
               });
           };

           var _getAllTrips = function () {
               return $http.get('https://localhost:44341/api/Trips')
                   .then(function (response) {
                       return response;
                   });
           }

           tripServiceFactory.addTrip = _addTrip;
           tripServiceFactory.getAllTrips = _getAllTrips;
           return tripServiceFactory;

       }]);
})();
//(function () {
//    "use strict";
//    angular.module('angularjourneyapp')
//       .factory('supportservice', ['$http', 'loginservice', '$rootscope', function ($http, loginservice, $rootscope) {

//           var proxy;
//           var connection;
//           return {

//               connect: function () {
//                   connection = loginservice.authentication.tokenbearer;
//                   connection.qs = { "access_token": token };
//                   proxy = connection.createhubproxy('supporthub')

//                   proxy.on('broadcast', function (name, message) {
//                       $rootscope.brodcast('brodcast', { name: name, message: message });
//                   });

//                   connection.start();
//               },
                
//               isconnecting: function () {
//                   return connection.state == 0;
//               },

//               isconnected: function () {
//                   return connection.state == 1;
//               },
               
//               connectionstate: function () {
//                   return connection.state;
//               },

//               send: function (name, message) {
//                   proxy.invoke('send', name, message);
//               }
//           }
       
//       }]);
//})();
(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('reportService', ['$http', function ($http) {

           var reportServiceFactory = {};

           var _getPdf = function (pdf) {

               return $http.post('https://localhost:44341/api/report', pdf)
                   .then(function (response) {
                       return response;
                   });
           };

           var _createChart = function (chart) {

               return $http.post('https://localhost:44341/api/report/chart', chart)
                   .then(function (response) {
                       return response;
                   });
           };

           reportServiceFactory.createChart = _createChart;
           reportServiceFactory.getPdf = _getPdf;
           return reportServiceFactory;

       }]);
})();
(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('registerService', ['$http', function ($http) {

           var registerServiceFactory = {};

           var _saveRegistration = function (registration) {

               return $http.post('https://localhost:44341/api/account/register', registration)
                   .then(function (response) {
                   return response;
               });
           };

           registerServiceFactory.saveRegistration = _saveRegistration;
           return registerServiceFactory;

       }]);
})();
(function () {
    "use strict";
    angular.module('AngularJourneyApp')
      .factory('loginService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

          var loginServiceFactory = {};
          var token = "";

          var _authentication = {
              isAuth: false,
              userName: "",
              token: ""           
          };

          var _login = function (loginData) {

              var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

              var deferred = $q.defer();

              $http.post('https://localhost:44341/' + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {

                  localStorageService.set('authorizationData', { token: response.data.access_token });

                  _authentication.isAuth = true;
                  _authentication.userName = loginData.userName;
                  _authentication.token = response.data.access_token;

                  deferred.resolve(response);

              }),
              function (err, status) {
                  _logOut();
                  deferred.reject(err);
              };

              return deferred.promise;

          };

          var _fillAuthData = function () {

              var authData = localStorageService.get('authorizationData');
              if (authData) {
                  _authentication.isAuth = true;
                  _authentication.userName = authData.userName;
              }

          }

          var _logOut = function () {

              localStorageService.remove('authorizationData');

              _authentication.isAuth = false;
              _authentication.userName = "";

          };

          loginServiceFactory.logOut = _logOut
          loginServiceFactory.login = _login;
          loginServiceFactory.fillAuthData = _fillAuthData;
          loginServiceFactory.authentication = _authentication;

          return loginServiceFactory;

    }]);
})();
(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('geoLocationService', ['$http', '$q', function ($http, $q) {

           var geoLocationService = {

               getUserLocation: function (callback) {
                   if (navigator.geolocation) {
                       navigator.geolocation.getCurrentPosition(showPosition, error);
                   } else {
                       Console.log("Inget stöd för geolocation.");
                   }

                   function error(error) {
                       console.log(error);
                   }

                   function showPosition(position) {
                       var geocoder = new google.maps.Geocoder;

                       var coords = position.coords;

                       var latlng = { lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude) };

                       geocoder.geocode({ 'location': latlng }, function (results, status) {
                           if (status == google.maps.GeocoderStatus.OK) {
                           }
                           if (results[0]) {
                               var formattedAdress = results[0].formatted_address;
                               console.log(formattedAdress);
                               callback(formattedAdress);
                           }
                       });
                   }
               }
           };
           return geoLocationService;
       }]);
})();
'use strict';
angular.module('AngularJourneyApp').
    factory('authInterceptorService', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    };

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/home');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);
(function () {
    angular.module('AngularJourneyApp')
        .controller('vehicleController', ['$scope', '$window', 'vehicleService', '$http', 'localStorageService', function ($scope, $window, vehicleService, $http, localStorageService) {

            $scope.vehicles = [];
            defaultVehicle = localStorage.getItem("DefaultVehicle");

            $scope.newVehicle = {
                LicensNumber: "",
                Status: true
            };

            $scope.getAllVehicles = function () {
                vehicleService.getSavedVehicles().then(function (response) {
                    $scope.vehicles = response.data
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

            $scope.defaultVehicle = function (index) {
                var defaultVehicle = $scope.vehicles[index];
                $window.localStorage.removeItem('DefaultVehicle');
                $window.localStorage.setItem('DefaultVehicle', defaultVehicle.carId);

            }

            $scope.deleteVehicle = function (index) {
                if (confirm("Vill du ta bort bilen?")) {
                    $http({
                        method: 'DELETE',
                        url: 'https://localhost:44341/api/Vehicles/' + $scope.vehicles[index].carId,
                    }).then(function successCallback(response) {
                        $scope.vehicles.splice(index, 1);
                    }, function errorCallback(response) {
                        alert("Error : " + response.data.ExceptionMessage);
                    });
                }
            };

            $scope.updateVehicle = function (index) {
                $http({
                    method: 'PUT',
                    url: 'https://localhost:44341/api/Vehicles/' + $scope.vehicles[index].carId,
                }).then(function successCallback(response) {
                    $scope.vehicles.splice(index, 1);
                    $scope.getAllVehicles();
                }, function errorCallback(response) {
                    alert("Error : " + response.data.ExceptionMessage);
                });              
            };

        }]);
})();
(function () {
    angular.module('AngularJourneyApp')
        .controller('tripController', ['$scope', '$window', 'geoLocationService', 'tripService', 'vehicleService', 'localStorageService', function ($scope, $window, geoLocationService, tripService, vehicleService, localStorageService) {

            $scope.vehicles = [];
            $scope.message = "";

            $scope.trip = {
                Vehicle: "",
                Date: "",
                MileageStart: "",
                MileageStop: "",
                DistanceTraveled: "",
                AdressStart: "",
                AdressStop: "",
                Erand: "",
                Notes: ""
            };


            $scope.saveTrip = function () {
                tripService.addTrip($scope.trip).then(function (response) {
                    $scope.message = "Resan sparades!";
                    $scope.trip = undefined;
                    $scope.trip.Notes = "";
                },
                 function (response) {
                     (response)
                 });
            }

            $scope.getAllVehicles = function () {
                var defaultVehicle = $window.localStorage.getItem('DefaultVehicle');
                $scope.defaultVehicle = defaultVehicle;
                vehicleService.getSavedVehicles().then(function (response) {
                    var array = [];
                    response.data.forEach(function (element) {
                        if ($scope.defaultVehicle && element.carId == $scope.defaultVehicle) {
                            $scope.trip.Vehicle = element.carId;
                            array.unshift(element);
                        } else {
                            array.push(element);
                        }
                    });
                    $scope.vehicles = array;
                },
                 function (response) {
                     (response)
                 });
            }


            $scope.getStartLocation = function () {
                geoLocationService.getUserLocation(function (address) {
                    $scope.trip.AdressStart = address;
                    $scope.$digest();
                });
            };

            $scope.getStopLocation = function () {
                geoLocationService.getUserLocation(function (address) {
                    $scope.trip.AdressStop = address;
                    $scope.$digest();
                });
            };

        }]);
})();
(function () {
    angular.module('AngularJourneyApp')
        .controller('supportController', ['$scope', 'loginService', '$http', '$location', '$q', function ($scope, loginService, $http, $location, $q) {

            var vm = this;
            vm.token = loginService.authentication.token;
            vm.userName = loginService.authentication.userName;

            var chat = $.connection.supportHub;
            $.connection.hub.logging = true;
            $.connection.qs = { "token": vm.token };
            $.connection.hub.qs = { 'userName': vm.userName, "token": vm.token };

            chat.client.broadcastMessage = function (name, message) {
                var encodedName = $('<div />').text(name).html();
                var encodedMsg = $('<div />').text(message).html();
                var align = "alert alert-warning";
                if (name === vm.userName) {
                    console.log(name);
                    console.log(vm.userName);
                    align = "alert alert-info text-right";
                }
                $('#discussion').prepend('<div class="' + align + '"><strong>' + encodedName
                    + '</strong><br />' + encodedMsg + '</div>');
            };

            $('#message').focus();
            $.connection.hub.start().done(function () {
                $('#sendmessage').click(function () {
                    chat.server.send($('#displayname').val(), $('#message').val());
                    $('#message').val('').focus();
                });
            });
  

            vm.authentication = loginService.authentication;
        }]);
})();
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
(function () {
    "use strict";
    angular.module('AngularJourneyApp') 
        .controller('registerController', ['$scope', '$location', '$timeout', 'registerService', function ($scope, $location, $timeout, registerService) {

            $scope.savedSuccessfully = false;
            $scope.message = "";

            $scope.registration = {
                userName: "",
                password: "",
                confirmPassword: ""
            };

            $scope.register = function () {

                registerService.saveRegistration($scope.registration).then(function (response) {

                    $scope.savedSuccessfully = true;
                    $scope.message = "användare " + $scope.registration.userName + " har blivit registrerad, omredigeras till login sidan om 3 sekunder.";
                    startTimer();

                },
                 function (response) {
                     var errors = [];
                     for (var key in response.data.modelState) {
                         for (var i = 0; i < response.data.modelState[key].length; i++) {
                             errors.push(response.data.modelState[key][i]);
                         }
                     }
                     $scope.message = "Misslyckades att registrera ny användare på grund av:" + errors.join(' ');
                 });
            };

            var startTimer = function () {
                var timer = $timeout(function () {
                    $timeout.cancel(timer);
                    $location.path('/home');
                }, 3000);
            }

        }]);
})();
(function(){
    angular.module('AngularJourneyApp')
        .controller('mainpageController', ['$scope', 'tripService', function ($scope, tripService) {

    }]);
})();
(function(){
    angular.module('AngularJourneyApp')
        .controller('indexController', ['$scope', '$location', 'loginService', function ($scope, $location, loginService) {

    $scope.logOut = function () {
        loginService.logOut();
        $location.path('/home');
    }

    $scope.authentication = loginService.authentication;

}]);
})();
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