using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;

namespace ActiveNetwork.Web.Mapper
{
    public class ANEventMapper
    {
        public static ANEventModel ToModel(ANEvent entity)
        {
            return entity == null ? null : new ANEventModel()
            {
                Id = entity.Id,                
                Host = new UserModel() { Id = entity.UserId.GetValueOrDefault() },
            };
        }

        public static List<ANEventModel> ToModel(IEnumerable<ANEvent> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}