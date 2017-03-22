using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class UpdateEventDescriptionRequestModel
    {
        public int ANEventId { get; set; }
        public string Description { get; set; }
    }
}