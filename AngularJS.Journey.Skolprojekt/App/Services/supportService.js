(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('supportService', ['$http', 'loginService', '$rootScope', function ($http, loginService, $rootScope) {

           var proxy;
           var connection;
           return {

               connect: function () {
                   connection = loginService.authentication.tokenBearer;
                   connection.qs = { "access_token": token };
                   proxy = connection.createHubProxy('SupportHub')

                   proxy.on('broadcast', function (name, message) {
                       $rootScope.brodcast('brodcast', { name: name, message: message });
                   });

                   connection.start();
               },
                
               isConnecting: function () {
                   return connection.state == 0;
               },

               isConnected: function () {
                   return connection.state == 1;
               },
               
               connectionState: function () {
                   return connection.state;
               },

               send: function (name, message) {
                   proxy.invoke('send', name, message);
               }
           }
       
       }]);
})();