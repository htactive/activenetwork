using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventDetailMemberModel
    {
        public int EventId { get; set; }
        public ANEventMemberModel ANEventMembers { get; set; }
    }
}