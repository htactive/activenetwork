using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventDetailModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int EventMember { get; set; }
        public int RequestToJoin { get; set; }
        public int Posts { get; set; }
        public int Images { get; set; }
    }
}