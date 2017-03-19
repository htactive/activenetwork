using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class NewFeedsModel
    {
        public List<ANEventInNewFeedsModel> ANEvents { get; set; }
        public DateTime ServerDateTimeNow { get; set; }
    }
}