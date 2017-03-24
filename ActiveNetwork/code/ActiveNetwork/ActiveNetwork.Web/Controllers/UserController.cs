using ActiveNetwork.Web.Mapper;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using System.Data.Entity;
using ActiveNetwork.Entities;

namespace ActiveNetwork.Web.Controllers
{
    public class UserController : BaseApiController
    {

        [HttpPost, AllowAnonymous, Route("user/login")]
        public UserModel Login([FromBody]LoginRequestModel request)
        {
            var userLogin = this.ANDBUnitOfWork.UserRepository.GetAll()
                .Include(x => x.UserRoles)
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
                    string.Join(",", userModel.Roles ?? new List<string>()));
                string encryptedTicket = FormsAuthentication.Encrypt(authTicket);

                FormsAuthentication.SetAuthCookie(userModel.Username, request.IsRememberMe);
                var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                HttpContext.Current.Response.Cookies.Add(authCookie);
            }
            return userModel;
        }

        [HttpPost, AllowAnonymous, Route("user/register")]
        public RegisterResponseModel Register([FromBody]RegisterRequestModel request)
        {
            if (this.ANDBUnitOfWork.UserRepository.GetAll().Any(x => x.Username == request.Username))
            {
                return new RegisterResponseModel() { IsSuccessed = false, ErrorMessage = "email-already-exist" };
            }

            var roleForNormalUser = this.ANDBUnitOfWork.RoleRepository.GetAll().FirstOrDefault(x => x.RoleName == Common.ANRoleConstant.USER);

            var userLogin = new User()
            {
                Username = request.Username,
                Password = request.Password,
                UserProfiles = new List<UserProfile>() { 
                    new UserProfile() {
                        Email = request.Username, 
                        FirstName = request.FirstName,
                        LastName =request.LastName,
                        MiddleName = request.MiddleName
                    } 
                }
            };

            if (roleForNormalUser != null)
            {
                userLogin.UserRoles = new List<UserRole>(){
                    new UserRole(){ RoleId = roleForNormalUser.Id}
                };
            }

            this.ANDBUnitOfWork.UserRepository.Save(userLogin);
            this.ANDBUnitOfWork.Commit();


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
                    true,// Remember me Value
                    string.Join(",", userModel.Roles ?? new List<string>()));
                string encryptedTicket = FormsAuthentication.Encrypt(authTicket);

                FormsAuthentication.SetAuthCookie(userModel.Username, true);
                var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                HttpContext.Current.Response.Cookies.Add(authCookie);
            }
            return new RegisterResponseModel() { IsSuccessed = true, User = userModel };
        }
        [HttpPost, Route("user/change-password")]
        [HTActive.Authorize.Core.HTActiveAuthorize(Roles = Common.ANRoleConstant.USER)]
        public bool ChangePassword(ChangePasswordRequest request)
        {
            var user = this.ANDBUnitOfWork.UserRepository.GetAll().FirstOrDefault(x => x.Id == CurrentUser.Id && x.Password == request.OldPassword);
            if (user == null) return false;
            user.Password = request.NewPassword;
            this.ANDBUnitOfWork.UserRepository.Save(user);
            this.ANDBUnitOfWork.Commit();
            return true;
        }
    }
}