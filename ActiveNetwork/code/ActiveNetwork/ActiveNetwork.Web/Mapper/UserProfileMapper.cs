using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Mapper
{
    public class UserProfileMapper
    {
        public static UserProfileModel ToModel(UserProfile entity)
        {
            return entity == null ? null : new UserProfileModel()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                UserName = entity.UserName,
                BirthDate = entity.BirthDate,
                Gender = entity.Gender,
                Email = entity.Email,
                Phone = entity.Phone,
                Address = entity.Address
            };
        }

        public static List<UserProfileModel> ToModel(IEnumerable<UserProfile> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }

        public static UserProfile ToEntity(UserProfileModel model)
        {
            return model == null ? null : new UserProfile()
            {
                Id = model.Id,
                UserName = model.UserName,
                BirthDate = model.BirthDate,
                Gender = model.Gender,
                Email = model.Email,
                Phone = model.Phone,
                Address = model.Address
            };
        }

        public static List<UserProfile> ToEntity(IEnumerable<UserProfileModel> models)
        {
            return models == null ? null : models.Select(ToEntity).ToList();
        }
    }
}