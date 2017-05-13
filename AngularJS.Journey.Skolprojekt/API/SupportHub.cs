using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using System.Linq;
using System.Security.Claims;

namespace Journey.Support
{
    [Authorize]
    public class SupportHub : Hub
    {

        private string GetCurrentUser()
        {
            var identity = (ClaimsIdentity)Context.User.Identity;
            var name = identity.Claims.FirstOrDefault(x => x.Type.Equals("user_name")).Value;
            return name;
        }

        public void Send(string name, string message)
        {
            var currentUserName = Context.QueryString["userName"];
            var user = GetCurrentUser();

            Clients.All.broadcastMessage(user, message);

        }

        public override Task OnConnected()
        {
            var connectionId = Context.ConnectionId;
            var connectionUser = Context.User;
            var currentUserName = Context.QueryString["userName"];
            Groups.Add(connectionId, currentUserName);

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


        public void Hello()
        {
            Clients.All.hello();
        }
    }
}