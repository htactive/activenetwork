using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class NewFeedsModel
    {
        public List<ANEventModel> ANEvents { get; set; }
        public DateTime ServerDateTimeNow { get; set; }
    }
}