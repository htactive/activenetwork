using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventMemberModel
    {
        public int Id { get; set; }
        public int? ANEventId { get; set; }
        public int? UserId { get; set; }
    }
}