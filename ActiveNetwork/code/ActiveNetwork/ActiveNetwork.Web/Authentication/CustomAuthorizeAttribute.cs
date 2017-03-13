using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Security;

namespace HTActive.Authorize.Core
{
    public class HTActiveAuthorizeAttribute : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var allowAll = false;
            if (System.Configuration.ConfigurationManager.AppSettings["AllowAllRequest"] != null)
            {
                bool.TryParse(System.Configuration.ConfigurationManager.AppSettings["AllowAllRequest"].ToString(), out allowAll);
                if (allowAll)
                    return true;
            }

            var authCookies = actionContext.Request.Headers.GetCookies(FormsAuthentication.FormsCookieName).FirstOrDefault();
            if (authCookies != null && authCookies.Cookies.Count > 0)
            {
                var authCookie = authCookies.Cookies.FirstOrDefault(t => t.Name == FormsAuthentication.FormsCookieName);
                if (authCookie == null || authCookie.Value == "")
                    return false;

                FormsAuthenticationTicket authTicket;
                try
                {
                    authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                }
                catch
                {
                    return false;
                }

                if (authTicket.Expired)
                {
                    FormsAuthentication.SignOut();
                    return false;
                }

                string[] roles = authTicket.UserData.Split(',');

                if (!string.IsNullOrEmpty(authTicket.Name))
                    actionContext.RequestContext.Principal = new GenericPrincipal(new GenericIdentity(authTicket.Name), roles);
            }

            var currentRoles = this.Roles.Split(',');
            if (actionContext.RequestContext.Principal.Identity.IsAuthenticated &&
                currentRoles.Any(x => actionContext.RequestContext.Principal.IsInRole(x)))
            {
                return true;
            }
            return false;
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            actionContext.Response = new HttpResponseMessage(System.Net.HttpStatusCode.Forbidden);
        }
    }
}