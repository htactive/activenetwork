using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public List<UserProfileModel> Profiles { get; set; }
        public UserProfileModel Profile { get; set; }
    }
}