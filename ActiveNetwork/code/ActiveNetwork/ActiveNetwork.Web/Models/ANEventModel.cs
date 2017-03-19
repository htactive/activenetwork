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
        public UserModel Host { get; set; }
        public ImageModel CoverPhoto { get; set; }
        public DateTime CreatedDate { get; set; }
        public ANEventInformationModel Information { get; set; }
        public int Day { get; set; }
        public int NumberOfMember { get; set; }
        public List<CategoryModel> Categories { get; set; }

        public List<ANEventRequirementModel> ANEventRequirements { get; set; }
        public List<ANEventCategoryModel> ANEventCategories { get; set; }
        public List<ANEventInformationModel> ANEventInformations { get; set; }
        public List<ANEventMemberModel> ANEventMembers { get; set; }
        public List<ANEventRequestToJoinModel> ANEventRequestToJoins { get; set; }
        public List<ANEventImageModel> ANEventImages { get; set; }
        public List<ANEventUserFavouriteModel> ANEventUserFavourites { get; set; }
    }

    public class ANEventRequirementModel
    {
        public int Id { get; set; }
    }

    public class ANEventCategoryModel
    {
        public int Id { get; set; }
        public ANEventModel ANEvent { get; set; }
        public CategoryModel Category { get; set; }
    }

    public class ANEventMemberModel
    {
        public int Id { get; set; }
        public ANEventModel ANEvent { get; set; }
        public UserModel User { get; set; }
        public DateTime JoinDate { get; set; }
    }

    public class ANEventRequestToJoinModel
    {
        public int Id { get; set; }
        public ANEventModel ANEvent { get; set; }
        public UserModel User { get; set; }
        public DateTime RequestDate { get; set; }
        public int Status { get; set; }
    }

    public class ANEventImageModel
    {
        public int Id { get; set; }
        public ANEventModel ANEvent { get; set; }
        public ImageModel Image { get; set; }
    }
}