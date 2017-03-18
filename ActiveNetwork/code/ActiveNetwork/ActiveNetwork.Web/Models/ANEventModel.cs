using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class ANEventModel
    {
        public int Id { get; set; }
        public UserModel Host { get; set; }
        public ImageModel CoverPhoto { get; set; }
        public DateTime CreatedDate { get; set; }
        public ANEventInformationModel Information { get; set; }
        public int Day { get; set; }
        public int NumberOfMember { get; set; }

        public List<ANEventRequirementModel> ANEventRequirements { get; set; }
        public List<ANEventCategoryModel> ANEventCategories { get; set; }
        public List<ANEventInformationModel> ANEventInformations { get; set; }
        public List<ANEventMemberModel> ANEventMembers { get; set; }
        public List<ANEventRequestToJoinModel> ANEventRequestToJoins { get; set; }
        public List<ANEventImageModel> ANEventImages { get; set; }
    }
}