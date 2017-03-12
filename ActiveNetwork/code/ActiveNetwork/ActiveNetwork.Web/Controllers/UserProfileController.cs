using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using ActiveNetwork.Web.Models;
using ActiveNetwork.Web.Mapper;
using System.Data.Entity;

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
            var entity = this.ANDBUnitOfWork.UserProfileRepository.GetObject(model.Id);
            if (entity == null) return null;
            if (entity.LastName != model.LastName)
            {
                entity.LastName = model.LastName;
            }
            entity.MiddleName = model.MiddleName;
            entity.Phone = model.Phone;
            entity.Address = model.Address;
            entity.BirthDate = model.BirthDate;
            entity.Email = model.Email;
            entity.FirstName = model.FirstName;
            entity.Gender = model.Gender;

            var saveResult = this.ANDBUnitOfWork.UserProfileRepository.Save(entity);
            this.ANDBUnitOfWork.Commit();
            return UserProfileMapper.ToModel(saveResult);
        }
    }
}
