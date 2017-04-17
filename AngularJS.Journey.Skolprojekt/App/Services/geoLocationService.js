(function () {
    "use strict";
    angular.module('AngularJourneyApp')
       .factory('geoLocationService', ['$http', function ($http) {
       
           var geoLocationServiceFactory = {}

            var _getUserLocation =  function () {
               if (navigator.geolocation) {
                   navigator.geolocation.getCurrentPosition(showPosition, error);
               } else {
                   Console.log("No support for geolocation.");
               }

               function error(error){
                   console.log(error);
               }

               function showPosition(position) {
                
               var geocoder = new google.maps.Geocoder;

               var coords = position.coords;

               var latlng = { lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude) };

               return geocoder.geocode({ 'location': latlng }, function (results, status) {
                   console.log(results)
                   return results;
                   if (status == google.maps.GeocoderStatus.OK) {
                       console.log(results);
                       geoLocationServiceFactory.locations = results
                       if (results[0]) {
                           var formattedAdress = results[0].formatted_address;
                           console.log(formattedAdress);
                       } else {
                           console.log('No location found')
                     }
                   }
           })
        }      
      };
            geoLocationServiceFactory.getUserLocation = _getUserLocation;
            return geoLocationServiceFactory;
     }]);
})();