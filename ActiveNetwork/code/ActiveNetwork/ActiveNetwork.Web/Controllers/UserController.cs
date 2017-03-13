using ActiveNetwork.Web.Mapper;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using System.Data.Entity;

namespace ActiveNetwork.Web.Controllers
{
    public class UserController : BaseApiController
    {

        [HttpPost, AllowAnonymous, Route("user/login")]
        public UserModel Login([FromBody]LoginRequestModel request)
        {
            var userLogin = this.ANDBUnitOfWork.UserRepository.GetAll()
                .Include(x=>x.UserRoles)
                .Include("UserRoles.Role")
                .FirstOrDefault(t => t.Username == request.Username && t.Password == request.Password);

            UserModel userModel = null;

            if (userLogin != null)
            {
                int timeout = 30;
                if (System.Configuration.ConfigurationManager.AppSettings["Timeout"] != null)
                {
                    int.TryParse(System.Configuration.ConfigurationManager.AppSettings["Timeout"].ToString(), out timeout);
                }
                userModel = UserMapper.ToModel(userLogin);

                userModel.Roles = userLogin.UserRoles.Select(x => x.Role).Select(x => x.RoleName).ToList();

                var authTicket = new FormsAuthenticationTicket(
                    1,
                    userModel.Username,
                    DateTime.Now,
                    DateTime.Now.AddMinutes(timeout),//Timeout value, 
                    request.IsRememberMe,// Remember me Value
                    string.Join(",",userModel.Roles??new List<string>()));
                string encryptedTicket = FormsAuthentication.Encrypt(authTicket);

                FormsAuthentication.SetAuthCookie(userModel.Username, request.IsRememberMe);
                var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                HttpContext.Current.Response.Cookies.Add(authCookie);
            }
            return userModel;
        }

    }
}