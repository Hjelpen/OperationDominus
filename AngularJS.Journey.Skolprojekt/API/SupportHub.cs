using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using System.Security.Claims;
using AngularJS.Journey.Skolprojekt.Repositories;

namespace AngularJS.Journey.Skolprojekt.API
{
    [Authorize]
    public class SupportHub : Hub
    {

        private UserRepository _repo = new UserRepository();

        public void Hello()
        {
            Clients.All.hello();
        }

        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }

        private string GetUserName()
        {
            var identity = (ClaimsIdentity)Context.User.Identity;
            var name = identity.Claims.FirstOrDefault(x => x.Type.Equals("user_name")).Value;
            return name;
        }
    }
}