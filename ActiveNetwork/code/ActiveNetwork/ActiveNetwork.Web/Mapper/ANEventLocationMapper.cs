using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Mapper
{
    public class ANEventLocationMapper
    {
        public static ANEventLocationModel ToModel(ANEventLocation entity)
        {
            return entity == null ? null : new ANEventLocationModel()
            {
                Id = entity.Id,
                
            };
        }

        public static List<ANEventLocationModel> ToModel(IEnumerable<ANEventLocation> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}