(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('geoLocationService', ['$http', '$q', function ($http, $q) {
                
           var someService = {            

               getUserLocation: function () {
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
                               console.log(formattedAdress)
                           }
                       });
                   }
               }
           };
                        return someService; 
       }]);        
})();