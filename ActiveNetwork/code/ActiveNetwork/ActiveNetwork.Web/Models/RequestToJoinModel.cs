using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class RequestToJoinModel
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public int UserId { get; set; }
    }
}