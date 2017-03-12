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
                ANEventId = entity.ANEventId,
                UserId = entity.UserId
            };
        }

        public static List<ANEventMemberModel> ToModel(IEnumerable<ANEventMember> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }

        public static ANEventMember ToEntity(ANEventMemberModel model)
        {
            return model == null ? null : new ANEventMember()
            {
                Id = model.Id,
                ANEventId = model.ANEventId,
                UserId = model.UserId
            };
        }

        public static List<ANEventMember> ToEntity(IEnumerable<ANEventMemberModel> models)
        {
            return models == null ? null : models.Select(ToEntity).ToList();
        }
    }
}