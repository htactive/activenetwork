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
                Informations = Mapper.ANEventInformationMapper.ToModel(entity.ANEventInformations),
                RequestToJoins = Mapper.ANEventRequestToJoinMapper.ToModel(entity.ANEventRequestToJoins),
            };
        }

        public static List<ANEventModel> ToModel(IEnumerable<ANEvent> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}