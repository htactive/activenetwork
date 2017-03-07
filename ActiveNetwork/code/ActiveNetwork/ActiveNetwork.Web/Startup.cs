using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ActiveNetwork.Web.Startup))]
namespace ActiveNetwork.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
