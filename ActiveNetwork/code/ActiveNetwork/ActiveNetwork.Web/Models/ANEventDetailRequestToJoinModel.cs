using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventDetailRequestToJoinModel
    {
        public int EventId { get; set; }
        public List<ANEventRequestToJoinModel> ANEventRequestToJoins { get; set; }
    }
}