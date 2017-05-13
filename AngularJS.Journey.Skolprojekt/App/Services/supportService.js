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