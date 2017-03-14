using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public List<string> Roles { get; set; }
        public UserProfileModel Profile { get; set; }
    }

    public class LoginRequestModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsRememberMe { get; set; }
    }

    public class RegisterRequestModel
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Password { get; set; }
    }

    public class RegisterResponseModel
    {
        public bool IsSuccessed { get; set; }
        public string ErrorMessage { get; set; }
        public UserModel User { get; set; }
    }
}