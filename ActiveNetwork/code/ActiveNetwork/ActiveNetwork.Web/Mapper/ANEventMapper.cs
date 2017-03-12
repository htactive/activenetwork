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
                UserId = entity.UserId,
                ANEventMembers = Mapper.ANEventMemberMapper.ToModel(entity.ANEventMembers),
                Images = Mapper.ANEventImageMapper.ToModel(entity.ANEventImages),
                Information = entity.Information,
                RequestToJoins = Mapper.ANEventRequestToJoinMapper.ToModel(entity.ANEventRequestToJoins)
            };
        }

        public static List<ANEventModel> ToModel(IEnumerable<ANEvent> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }

        public static ANEvent ToEntity(ANEventModel model)
        {
            return model == null ? null : new ANEvent()
            {
                Id = model.Id,
                UserId = model.UserId,
                ANEventMembers = Mapper.ANEventMemberMapper.ToEntity(model.ANEventMembers),
                ANEventImages = Mapper.ANEventImageMapper.ToEntity(model.Images),
                Information = model.Information,
                ANEventRequestToJoins = Mapper.ANEventRequestToJoinMapper.ToEntity(model.RequestToJoins)
            };
        }

        public static List<ANEvent> ToEntity(IEnumerable<ANEventModel> models)
        {
            return models == null ? null : models.Select(ToEntity).ToList();
        }
    }
}