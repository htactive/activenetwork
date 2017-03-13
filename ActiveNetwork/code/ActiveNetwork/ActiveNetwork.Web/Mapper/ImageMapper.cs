using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Mapper
{
    public class ImageMapper
    {
        public static ImageModel ToModel(Image entity)
        {
            return entity == null ? null : new ImageModel()
            {
                Id = entity.Id,
                Url = entity.Url
            };
        }

        public static List<ImageModel> ToModel(IEnumerable<Image> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}