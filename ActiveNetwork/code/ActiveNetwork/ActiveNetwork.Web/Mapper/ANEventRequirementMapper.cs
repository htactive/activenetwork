using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;

namespace ActiveNetwork.Web.Mapper
{
    public class ANEventRequirementMapper
    {
        public static ANEventRequirementModel ToModel(ANEventRequirement entity)
        {
            return entity == null ? null : new ANEventRequirementModel()
            {
                Id = entity.Id,
            };
        }

        public static List<ANEventRequirementModel> ToModel(IEnumerable<ANEventRequirement> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}