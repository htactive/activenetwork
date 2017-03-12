using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventInformationModel
    {
        public int Id { get; set; }
        public int ANEventId { get; set; }
        public DateTime CreateTime { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
    }
}