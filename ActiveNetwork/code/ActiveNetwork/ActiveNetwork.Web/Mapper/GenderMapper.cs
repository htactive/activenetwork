using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Mapper
{
    public class GenderMapper
    {
        public static GenderModel ToModel(Gender entity)
        {
            return entity == null ? null : new GenderModel()
            {
                Id = entity.Id,
                GenderName = entity.GenderName
            };
        }

        public static List<GenderModel> ToModel(IEnumerable<Gender> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}