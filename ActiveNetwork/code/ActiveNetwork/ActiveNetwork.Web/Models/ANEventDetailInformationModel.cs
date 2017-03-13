using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventDetailInformationModel
    {
        public int EventID { get; set; }
        public ANEventInformationModel EventInformation { get; set; }
    }
}