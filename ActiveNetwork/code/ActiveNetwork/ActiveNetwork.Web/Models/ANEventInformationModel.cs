using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventInformationModel
    {
        public int Id { get; set; }
        public string EventLocation { get; set; }
        public ANEventLocationModel EventLocationM { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public ANEventModel ANEvent { get; set; }
    }

    public class ANEventLocationModel
    {
        public int Id { get; set; }
        public string GGId { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }
    }
}