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
                ANEventId = entity.ANEventId,
                RequiredId = entity.RequiredId
            };
        }

        public static List<ANEventRequirementModel> ToModel(IEnumerable<ANEventRequirement> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }

        public static ANEventRequirement ToEntity(ANEventRequirementModel model)
        {
            return model == null ? null : new ANEventRequirement()
            {
                Id = model.Id,
                ANEventId = model.ANEventId,
                RequiredId = model.RequiredId
            };
        }

        public static List<ANEventRequirement> ToEntity(IEnumerable<ANEventRequirementModel> models)
        {
            return models == null ? null : models.Select(ToEntity).ToList();
        }
    }
}