using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class UserProfileModel
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string UserName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
    }
}