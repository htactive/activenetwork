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
        public List<UserProfileModel> Profiles { get; set; }
        public UserProfileModel Profile { get; set; }
    }

    public class LoginRequestModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsRememberMe { get; set; }
    }
}