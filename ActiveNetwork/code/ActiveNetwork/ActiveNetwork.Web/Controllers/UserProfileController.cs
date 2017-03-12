using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using ActiveNetwork.Web.Models;
using ActiveNetwork.Web.Mapper;

namespace ActiveNetwork.Web.Controllers
{
    public class UserProfileController : BaseApiController
    {
        [Route("anprofile/get-user-profile"), HttpGet]
        public UserProfileModel GetUserProfile(int UserID)
        {
            var entity = this.ANDBUnitOfWork.UserProfileRepository.GetAll().FirstOrDefault(x => x.UserId == UserID);
            if (entity == null) return null;
            return UserProfileMapper.ToModel(entity);
        }

        [Route("anprofile/update-user-profile"), HttpPost]
        public UserProfileModel UpdateUserProfile([FromBody]UserProfileModel model)
        {
            var entity = this.ANDBUnitOfWork.UserProfileRepository.Save(UserProfileMapper.ToEntity(model));
            if (entity != null)
            {
                this.ANDBUnitOfWork.Commit();
                return UserProfileMapper.ToModel(entity);
            }
            return null;
        }
    }
}
