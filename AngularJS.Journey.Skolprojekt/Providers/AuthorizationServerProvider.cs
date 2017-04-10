using Microsoft.Owin.Security.OAuth;
using System.Threading.Tasks;
using AngularJS.Journey.Skolprojekt.Repositories;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using Microsoft.AspNet.Identity.Owin;
using AngularJS.Journey.Skolprojekt.Models;

namespace AngularJS.Journey.Skolprojekt.Providers
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext contex)
        {
            contex.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext contex)
        {
            contex.OwinContext.Response.Headers.Add("Acess-Control-Allow-Origin", new[] { "*" });

            using (UserRepository _repo = new UserRepository())
            {
                IdentityUser user = await _repo.FindUser(contex.UserName, contex.Password);

                if (user == null)
                {
                    contex.SetError("invalid_grant", "Felaktigt användarnamn eller lösenord.");
                    return;
                }
            }

            var identity = new ClaimsIdentity(contex.Options.AuthenticationType);
            identity.AddClaim(new Claim("user_name", contex.UserName));
            identity.AddClaim(new Claim("role", "user"));
            contex.Validated(identity);

            var userid = contex.UserName;
        }
    }
}