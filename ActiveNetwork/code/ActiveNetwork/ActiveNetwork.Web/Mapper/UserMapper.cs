using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Mapper
{
    public class UserMapper
    {
        public static UserModel ToModel(User entity)
        {
            return entity == null ? null : new UserModel()
            {
                Id = entity.Id,
                Username = entity.Username
            };
        }

        public static List<UserModel> ToModel(IEnumerable<User> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}