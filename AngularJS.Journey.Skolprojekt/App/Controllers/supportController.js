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