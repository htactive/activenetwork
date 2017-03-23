using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Models
{
    public class RequiredProfileModel
    {
        public int Id { get; set; }
        public List<ANEventRequirementModel> anEventRequirementModel { get; set; }
    }
}