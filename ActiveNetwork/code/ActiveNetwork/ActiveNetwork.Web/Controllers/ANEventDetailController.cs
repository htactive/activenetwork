using ActiveNetwork.Web.Mapper;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Threading;


namespace ActiveNetwork.Web.Controllers
{
    public class ANEventDetailController : BaseApiController
    {
        [Route("anevent-detail/get-event-detail"), HttpGet]
        public ANEventModel GetEventDetail(int Id)
        {
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll().FirstOrDefault(x => x.Id == Id);
            if (entity == null) return null;
            return ANEventMapper.ToModel(entity);
        }

        [Route("anevent-detail/get-event-detail-header"), HttpGet]
        public ANEventDetailHeaderModel GetEventDetailHeader(int Id)
        {
            Thread.Sleep(2000);
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include("ANEventInformations")
                .Include("ANEventImages.Image")
                .FirstOrDefault(x => x.Id == Id);

            if (entity == null) return null;
            var firstInformation = entity.ANEventInformations.FirstOrDefault();
            var coverPhoto = entity.ANEventImages.FirstOrDefault(x => x.ANEventImageType == (int)Common.ANEventImageType.ANEventCoverImage);
            return new ANEventDetailHeaderModel()
            {
                EventID = entity.Id,
                EventTitle = firstInformation.Title,
                EventCoverPhoto = ImageMapper.ToModel(coverPhoto != null ? coverPhoto.Image : null)
            };
        }

        [Route("anevent-detail/get-event-detail-information"), HttpGet]
        public ANEventDetailInformationModel GetEventDetailInformation(int Id)
        {
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include("ANEventInformations")
                .Include("User.UserProfiles.Image")
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return null;

            var firstInformation = entity.ANEventInformations.FirstOrDefault();

            var host = UserMapper.ToModel(entity.User);
            if (host != null)
            {
                host.Profile = UserProfileMapper.ToModel(entity.User.UserProfiles.FirstOrDefault());
                host.Profile.Avatar = new ImageModel
                {
                    Id = entity.User.Id,
                    Url = entity.User.UserProfiles.FirstOrDefault().Image.Url,
                };
            }

            var informationModel = new ANEventDetailInformationModel()
            {
                EventID = entity.Id,
                EventInformation = firstInformation != null ?
                 ANEventInformationMapper.ToModel(firstInformation) : null,
                Host = host
            };
            return informationModel;
        }

        [Route("anevent-detail/get-event-detail-member"), HttpGet]
        public ANEventDetailMemberModel GetEventDetailMember(int Id)
        {
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include("ANEventMembers.User.UserProfiles.Image")
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return null;
            var listMember = entity.ANEventMembers.Select(x =>
                        new ANEventMemberModel()
                        {
                            Id = x.User.Id,
                            ANEvent = new ANEventModel() { Id = x.ANEventId.GetValueOrDefault() },
                            User = User != null ? new UserModel()
                            {
                                Id = x.User.Id,
                                Username = x.User.Username,
                                Profile = x.User.UserProfiles.FirstOrDefault() != null ?
                                new UserProfileModel()
                                {
                                    Avatar = new ImageModel
                                    {
                                        Id = x.User.Id,
                                        Url = x.User.UserProfiles.FirstOrDefault().Image != null ?
                                        x.User.UserProfiles.FirstOrDefault().Image.Url : null,
                                    },
                                    FirstName = x.User.UserProfiles.FirstOrDefault().FirstName,
                                    LastName = x.User.UserProfiles.FirstOrDefault().LastName,
                                    MiddleName = x.User.UserProfiles.FirstOrDefault().MiddleName
                                } :
                                new UserProfileModel()
                                {
                                    Avatar = new ImageModel
                                    {
                                        Id = x.User.Id,
                                        Url = null,
                                    },
                                    FirstName = null,
                                    LastName = null,
                                    MiddleName = null
                                }
                            } : null
                        }
                ).ToList();
            return new ANEventDetailMemberModel()
            {
                EventId = entity.Id,
                ANEventMembers = listMember
            };
        }
    }
}