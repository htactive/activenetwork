using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventDetailHeaderModel
    {
        public int EventID { get; set; }
        public string EventTitle { get; set; }
        public ImageModel EventCoverPhoto {get; set;}
    }
}