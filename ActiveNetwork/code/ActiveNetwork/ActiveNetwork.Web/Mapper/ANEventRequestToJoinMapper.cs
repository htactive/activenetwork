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
                ANEventId = entity.ANEventId,
                UserId = entity.UserId
            };
        }

        public static List<ANEventRequestToJoinModel> ToModel(IEnumerable<ANEventRequestToJoin> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }

        public static ANEventRequestToJoin ToEntity(ANEventRequestToJoinModel model)
        {
            return model == null ? null : new ANEventRequestToJoin()
            {
                Id = model.Id,
                ANEventId = model.ANEventId,
                UserId = model.UserId
            };
        }

        public static List<ANEventRequestToJoin> ToEntity(IEnumerable<ANEventRequestToJoinModel> models)
        {
            return models == null ? null : models.Select(ToEntity).ToList();
        }
    }
}