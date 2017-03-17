using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventRequestToJoinModel
    {
        public int Id { get; set; }
        public ANEventModel ANEvent { get; set; }
        public UserModel User { get; set; }
        public DateTime RequestDate { get; set; }
    }
}