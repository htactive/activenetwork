using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;

namespace ActiveNetwork.Web.Mapper
{
    public class ANEventInformationMapper
    {
        public static ANEventInformationModel ToModel(ANEventInformation entity)
        {
            return entity == null ? null : new ANEventInformationModel()
            {
                Id = entity.Id,
                ANEvent = new ANEventModel() { Id = entity.ANEventId.GetValueOrDefault() },
                Title = entity.Title,
                Description = entity.Description,
                Location = entity.EventLocation,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate
            };
        }

        public static List<ANEventInformationModel> ToModel(IEnumerable<ANEventInformation> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }

    }
}