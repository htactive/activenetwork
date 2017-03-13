using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using ActiveNetwork.Web.Models;
using ActiveNetwork.Web.Mapper;
using ActiveNetwork.Entities;
using HTActive.Authorize.Core;
using ActiveNetwork.Common;

namespace ActiveNetwork.Web.Controllers
{
    public class UserProfileController : BaseApiController
    {
        [Route("anprofile/get-user-profile"), HttpGet]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public UserProfileModel GetUserProfile(int Id)
        {
            var entity = this.ANDBUnitOfWork.UserProfileRepository.GetAll()
                .Include(x => x.Image)
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return null;
            var model = UserProfileMapper.ToModel(entity);
            if (model != null)
            {
                model.Avatar = ImageMapper.ToModel(entity.Image);
            }
            return model;
        }

        [Route("anprofile/update-user-profile"), HttpPost]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public UserProfileModel UpdateUserProfile([FromBody]UserProfileModel model)
        {
            var entity = this.ANDBUnitOfWork.UserProfileRepository.GetObject(model.Id);
            if (entity == null) return null;

            if (entity.LastName != model.LastName)
                entity.LastName = model.LastName;

            if (entity.MiddleName != model.MiddleName)
                entity.MiddleName = model.MiddleName;

            if (entity.Phone != model.Phone)
                entity.Phone = model.Phone;

            if (entity.Address != model.Address)
                entity.Address = model.Address;

            if (entity.BirthDate != model.BirthDate)
                entity.BirthDate = model.BirthDate;

            if (entity.Email != model.Email)
                entity.Email = model.Email;

            if (entity.FirstName != model.FirstName)
                entity.FirstName = model.FirstName;

            if (entity.Gender != model.Gender)
                entity.Gender = model.Gender;

            var saveResult = this.ANDBUnitOfWork.UserProfileRepository.Save(entity);
            this.ANDBUnitOfWork.Commit();
            return UserProfileMapper.ToModel(saveResult);
        }

        [Route("anprofile/create-user-profile"), HttpPost]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public UserProfileModel CreateUserProfile([FromBody]UserProfileModel model)
        {
            var entity = new UserProfile()
            {
                LastName = model.LastName,
                MiddleName = model.MiddleName,
                FirstName = model.FirstName,
                Phone = model.Phone,
                Address = model.Address,
                BirthDate = model.BirthDate,
                Email = model.Email,
                Gender = model.Gender,
                UserId = model.User.Id
            };

            var saveResult = this.ANDBUnitOfWork.UserProfileRepository.Save(entity);
            this.ANDBUnitOfWork.Commit();
            return UserProfileMapper.ToModel(saveResult);
        }
    }
}
