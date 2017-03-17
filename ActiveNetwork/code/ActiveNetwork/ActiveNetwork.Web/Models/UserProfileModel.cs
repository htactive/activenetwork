using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class UserProfileModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public DateTime? BirthDate { get; set; }
        public GenderModel Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public UserModel User { get; set; }
        public ImageModel Avatar { get; set; }
        public string Introduction { get; set; }
    }

    public class GenderModel
    {
        public int Id { get; set; }
        public string GenderName { get; set; }
    }
}