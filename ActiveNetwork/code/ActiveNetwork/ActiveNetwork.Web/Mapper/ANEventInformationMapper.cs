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
                ANEventId = entity.ANEventId,
                Title = entity.Title,
                Description = entity.Description,
                Location = entity.EventLocation,
                CreateDate = entity.CreateDate,
                EndDate = entity.EndDate
            };
        }

        public static List<ANEventInformationModel> ToModel(IEnumerable<ANEventInformation> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }

        public static ANEventInformation ToEntity(ANEventInformationModel model)
        {
            return model == null ? null : new ANEventInformation()
            {
                Id = model.Id,
                ANEventId = model.ANEventId,
                Title = model.Title,
                Description = model.Description,
                EventLocation = model.Location,
                CreateDate = model.CreateDate,
                EndDate = model.EndDate
            };
        }

        public static List<ANEventInformation> ToEntity(IEnumerable<ANEventInformationModel> models)
        {
            return models == null ? null : models.Select(ToEntity).ToList();
        }
    }
}