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
        public UserModel Host { get; set; }
    }

    public class ANEventDetailRequestToJoinModel
    {
        public int EventId { get; set; }
        public List<ANEventRequestToJoinModel> ANEventRequestToJoins { get; set; }
    }

    public class ANEventDetailMemberModel
    {
        public int EventId { get; set; }
        public List<ANEventMemberModel> ANEventMembers { get; set; }
    }

    public class ANEventDetailHeaderModel
    {
        public int EventID { get; set; }
        public string EventTitle { get; set; }
        public ImageModel EventCoverPhoto { get; set; }
        public bool IsHost { get; set; }
        public bool IsPendingMember { get; set; }
        public bool IsMember { get; set; }
    }
}