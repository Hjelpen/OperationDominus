using AngularJS.Journey.Skolprojekt.Providers;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System.Web.Http;
using System;
using System.Threading.Tasks;

[assembly: OwinStartup(typeof(AngularJS.Journey.Skolprojekt.App_Start.Startup))]
namespace AngularJS.Journey.Skolprojekt.App_Start
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            log4net.Config.XmlConfigurator.Configure();
            app.MapSignalR();

            ConfigureOAuth(app);
            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            
            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                Provider = new AuthorizationServerProvider(),
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(10)
            };

            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions()
            {
                Provider = new QueryStringOAuthBearerProvider()
            });
        }

        public class QueryStringOAuthBearerProvider : OAuthBearerAuthenticationProvider
        {

            public override Task RequestToken(OAuthRequestTokenContext context)
            {

                var value = context.Request.Query.Get("access_token");

                if(!string.IsNullOrEmpty(value))
                {
                    context.Token = value;
                }

                return Task.FromResult<object>(context);
            }
        }
    }
}