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
                .FirstOrDefault(x => x.UserId.HasValue && x.UserId.Value == Id);
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
            var profileEntity = this.ANDBUnitOfWork.UserProfileRepository.GetObject(model.Id);
            if (profileEntity == null) return null;


            if (model.Address != null && profileEntity.Address != model.Address)
            {
                profileEntity.Address = model.Address;
            }
            if (model.BirthDate.HasValue && profileEntity.BirthDate != model.BirthDate)
            {
                profileEntity.BirthDate = model.BirthDate;
            }
            if (model.Email != null && profileEntity.Email != model.Email)
            {
                profileEntity.Email = model.Email;
            }
            if (model.FirstName != null && profileEntity.FirstName != model.FirstName)
            {
                profileEntity.FirstName = model.FirstName;
            }
            if (model.Gender != null && model.Gender.Id!=0 && profileEntity.GenderId.GetValueOrDefault() != model.Gender.Id)
            {
                profileEntity.GenderId = model.Gender.Id;
            }
            if (model.LastName != null && profileEntity.LastName != model.LastName)
            {
                profileEntity.LastName = model.LastName;
            }
            if (model.MiddleName != null && profileEntity.MiddleName != model.MiddleName)
            {
                profileEntity.MiddleName = model.MiddleName;
            }
            if (model.Phone != null && profileEntity.Phone != model.Phone)
            {
                profileEntity.Phone = model.Phone;
            }
            if (model.Introduction != null && model.Introduction != profileEntity.Introduction)
            {
                profileEntity.Introduction = model.Introduction;
            }

            this.ANDBUnitOfWork.UserProfileRepository.Save(profileEntity);
            this.ANDBUnitOfWork.Commit();

            return UserProfileMapper.ToModel(profileEntity);
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
                GenderId = (model.Gender != null && model.Gender.Id != 0) ? (int?)model.Gender.Id : null,
                UserId = model.User.Id
            };

            var saveResult = this.ANDBUnitOfWork.UserProfileRepository.Save(entity);
            this.ANDBUnitOfWork.Commit();
            return UserProfileMapper.ToModel(saveResult);
        }
        [Route("anprofile/get-my-profile"), HttpGet]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public UserProfileModel GetMyProfile()
        {
            if (CurrentUser == null) return null;
            return GetUserProfile(CurrentUser.Id);
        }
        [Route("anprofile/update-my-profile"), HttpPost]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public UserProfileModel UpdateMyProfile(UserProfileModel model)
        {
            var profileEntity = this.ANDBUnitOfWork.UserProfileRepository.GetAll()
                .FirstOrDefault(x => x.UserId.HasValue && x.UserId.Value == CurrentUser.Id);

            if (profileEntity == null) return null;
            model.Id = profileEntity.Id;
            return UpdateUserProfile(model);
        }
    }
}
