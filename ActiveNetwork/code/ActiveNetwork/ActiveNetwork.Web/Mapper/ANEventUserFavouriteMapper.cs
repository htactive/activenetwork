using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Mapper
{
    public class ANEventUserFavouriteMapper
    {
        public static ANEventUserFavouriteModel ToModel(ANEventUserFavourite entity)
        {
            return entity == null ? null : new ANEventUserFavouriteModel()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                EventId = entity.EventId,
                CreatedDate =entity.CreatedDate
            };
        }

        public static List<ANEventUserFavouriteModel> ToModel(IEnumerable<ANEventUserFavourite> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}