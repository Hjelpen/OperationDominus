using Microsoft.Owin.Security.OAuth;
using System.Threading.Tasks;
using AngularJS.Journey.Skolprojekt.Repositories;
using System.Security.Claims;
using AngularJS.Journey.Skolprojekt.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace AngularJS.Journey.Skolprojekt.Providers
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            using (UserRepository _repo = new UserRepository())
            {
                ApplicationUser user = await _repo.FindUser(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("user_name", context.UserName));
            identity.AddClaim(new Claim("role", "user"));

            context.Validated(identity);

        }
    }

}