using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Mapper
{
    public class ANEventImageMapper
    {
        public static ANEventImageModel ToModel(ANEventImage entity)
        {
            return entity == null ? null : new ANEventImageModel()
            {
                Id = entity.Id,
                ANEventId = entity.ANEventId,
                ImageId = entity.ImageId
            };
        }

        public static List<ANEventImageModel> ToModel(IEnumerable<ANEventImage> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }

        public static ANEventImage ToEntity(ANEventImageModel model)
        {
            return model == null ? null : new ANEventImage()
            {
                Id = model.Id,
                ANEventId = model.ANEventId,
                ImageId = model.ImageId
            };
        }

        public static List<ANEventImage> ToEntity(IEnumerable<ANEventImageModel> models)
        {
            return models == null ? null : models.Select(ToEntity).ToList();
        }
    }
}