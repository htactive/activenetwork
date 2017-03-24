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
                ANEvent = new ANEventModel() { Id = entity.ANEventId.GetValueOrDefault() },
                Image = new ImageModel() { Id = entity.ImageId.GetValueOrDefault() }
            };
        }

        public static List<ANEventImageModel> ToModel(IEnumerable<ANEventImage> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}