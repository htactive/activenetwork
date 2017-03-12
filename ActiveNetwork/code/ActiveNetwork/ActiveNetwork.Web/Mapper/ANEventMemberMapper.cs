using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;

namespace ActiveNetwork.Web.Mapper
{
    public class ANEventMemberMapper
    {
        public static ANEventMemberModel ToModel(ANEventMember entity)
        {
            return entity == null ? null : new ANEventMemberModel()
            {
                Id = entity.Id,
                ANEvent = new ANEventModel() { Id = entity.ANEventId.GetValueOrDefault() },
                User = new UserModel() { Id = entity.UserId.GetValueOrDefault() }
            };
        }

        public static List<ANEventMemberModel> ToModel(IEnumerable<ANEventMember> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}