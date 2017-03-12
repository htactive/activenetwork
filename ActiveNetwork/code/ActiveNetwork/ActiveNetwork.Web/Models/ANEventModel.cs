using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<ANEventMemberModel> ANEventMembers { get; set; }
        public List<ANEventRequestToJoinModel> RequestToJoins { get; set; }
        public List<ANEventImageModel> Images { get; set; }
        public ANEventInformationModel Information { get; set; }
    }
}