using Microsoft.Owin;
using Owin;
using System.Web.Http;


[assembly: OwinStartup(typeof(AngularJS.Journey.Skolprojekt.App_Start.Startup))]
namespace AngularJS.Journey.Skolprojekt.App_Start
{
    public class Startup
    {      
        public void Configuration(IAppBuilder app)
        {
            ConfigureOAuth(app);
            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);
        }

        public void ConfigureOAuth(IAppBuilder app)
        {

        }

    }
}