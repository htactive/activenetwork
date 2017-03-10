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
        [Route("get-user-profile"), HttpGet]
        public UserProfileModel GetUserProfile(int UserID)
        {
            var entity = this.ANDBUnitOfWork.UserProfileRepository.GetAll().FirstOrDefault(x => x.Id == UserID);
            if (entity == null) return null;
            return UserProfileMapper.ToModel(entity);
        }
    }
}
