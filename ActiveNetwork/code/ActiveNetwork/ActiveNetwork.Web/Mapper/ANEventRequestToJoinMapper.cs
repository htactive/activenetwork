using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;

namespace ActiveNetwork.Web.Mapper
{
    public class ANEventRequestToJoinMapper
    {
        public static ANEventRequestToJoinModel ToModel(ANEventRequestToJoin entity)
        {
            return entity == null ? null : new ANEventRequestToJoinModel()
            {
                Id = entity.Id,
                ANEvent = new ANEventModel() { Id = entity.ANEventId.GetValueOrDefault() },
                User = new UserModel() { Id = entity.UserId.GetValueOrDefault() }
            };
        }

        public static List<ANEventRequestToJoinModel> ToModel(IEnumerable<ANEventRequestToJoin> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}