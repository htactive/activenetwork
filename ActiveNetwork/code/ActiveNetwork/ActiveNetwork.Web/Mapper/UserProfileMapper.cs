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
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                MiddleName = entity.MiddleName,
                BirthDate = entity.BirthDate,
                Gender = new GenderModel() { Id = entity.GenderId.GetValueOrDefault() },
                Email = entity.Email,
                Phone = entity.Phone,
                Address = entity.Address,
                User = new UserModel() { Id = entity.UserId.GetValueOrDefault() },
                Avatar = new ImageModel() { Id = entity.Avatar.GetValueOrDefault() },
                Introduction = entity.Introduction
            };
        }

        public static List<UserProfileModel> ToModel(IEnumerable<UserProfile> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}