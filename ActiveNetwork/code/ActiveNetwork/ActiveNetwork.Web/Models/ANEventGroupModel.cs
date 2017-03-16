using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventGroupModel
    {
        public int Year { get; set; }
        public List<ANEventMonthGroup> EventMonth { get; set; }
    }

    public class ANEventMonthGroup
    {
        public int Month { get; set; }
        public List<ANEventModel> Events { get; set; }
    }
}