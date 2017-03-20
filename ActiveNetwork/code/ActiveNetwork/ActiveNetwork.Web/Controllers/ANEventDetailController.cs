using ActiveNetwork.Web.Mapper;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Threading;
using HTActive.Authorize.Core;
using ActiveNetwork.Common;


namespace ActiveNetwork.Web.Controllers
{
    public class ANEventDetailController : BaseApiController
    {
        [Route("anevent-detail/get-event-detail"), HttpGet]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public ANEventModel GetEventDetail(int Id)
        {
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll().FirstOrDefault(x => x.Id == Id);
            if (entity == null) return null;
            return ANEventMapper.ToModel(entity);
        }

        [Route("anevent-detail/get-event-detail-header"), HttpGet]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public ANEventDetailHeaderModel GetEventDetailHeader(int Id)
        {
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include("ANEventInformations")
                .Include("ANEventImages.Image")
                .FirstOrDefault(x => x.Id == Id);

            if (entity == null) return null;
            var firstInformation = entity.ANEventInformations.FirstOrDefault();
            var coverPhoto = entity.ANEventImages.FirstOrDefault(x => x.ANEventImageType == (int)Common.ANEventImageType.ANEventCoverImage);
            var isPendingMember = this.ANDBUnitOfWork.ANEventRequestToJoinRepository.GetAll().Any(x=>x.ANEventId.HasValue && x.ANEventId.Value == Id && x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id && x.Status == (int)Common.ANRequestToJoinStatus.Waiting);
            var isMember = this.ANDBUnitOfWork.ANEventMemberRepository.GetAll().Any(x => x.ANEventId.HasValue && x.ANEventId.Value == Id && x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id);
            return new ANEventDetailHeaderModel()
            {
                EventID = entity.Id,
                EventTitle = firstInformation.Title,
                EventCoverPhoto = ImageMapper.ToModel(coverPhoto != null ? coverPhoto.Image : null),
                IsHost = entity.UserId.HasValue && this.CurrentUser.Id == entity.UserId.Value,
                IsPendingMember = isPendingMember,
                IsMember = isMember
            };
        }

        [Route("anevent-detail/get-event-detail-information"), HttpGet]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public ANEventDetailInformationModel GetEventDetailInformation(int Id)
        {
            //Thread.Sleep(3000);
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include("ANEventInformations")
                .Include("User.UserProfiles.Image")
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return null;

            var firstInformation = entity.ANEventInformations.FirstOrDefault();
            var firstUserProfile = entity.User.UserProfiles.FirstOrDefault();
            var host = UserMapper.ToModel(entity.User);
            if (host != null)
            {
                if (firstUserProfile != null)
                {
                    host.Profile = UserProfileMapper.ToModel(firstUserProfile);
                }

                if (firstUserProfile.Image != null)
                {
                    host.Profile.Avatar = ImageMapper.ToModel(firstUserProfile.Image);
                }
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
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public ANEventDetailMemberModel GetEventDetailMember(int Id)
        {
            //Thread.Sleep(1000);
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include("ANEventMembers.User.UserProfiles.Image")
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return null;
            var listMember = entity.ANEventMembers.Select(x =>
                {
                    var firstUserProfile = x.User.UserProfiles.FirstOrDefault();

                    var anEventMemberModel = ANEventMemberMapper.ToModel(x);
                    anEventMemberModel.User = UserMapper.ToModel(x.User);
                    if (anEventMemberModel.User != null)
                    {
                        anEventMemberModel.User.Profile = UserProfileMapper.ToModel(firstUserProfile);
                        if (anEventMemberModel.User.Profile != null)
                        {
                            anEventMemberModel.User.Profile.Avatar = ImageMapper.ToModel(firstUserProfile.Image);
                        }
                    }
                    return anEventMemberModel;
                }
                ).ToList();
            return new ANEventDetailMemberModel()
            {
                EventId = entity.Id,
                ANEventMembers = listMember
            };
        }


        [Route("anevent-detail/get-event-detail-joiner"), HttpGet]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public ANEventDetailRequestToJoinModel GetEventDetailRequestToJoin(int Id)
        {
            var requestEntity = this.ANDBUnitOfWork.ANEventRequestToJoinRepository.GetAll()
                .Include("User.UserProfiles.Image")
                .Where(x => x.ANEventId.HasValue && x.ANEventId.Value == Id && x.Status.HasValue && x.Status.Value == (int)Common.ANRequestToJoinStatus.Waiting).ToList();

            var RTJmodels = requestEntity.Select(x =>
                {
                    var firstUserProfile = x.User.UserProfiles.FirstOrDefault();
                    var anEventRTJModel = ANEventRequestToJoinMapper.ToModel(x);
                    anEventRTJModel.User = UserMapper.ToModel(x.User);

                    if (anEventRTJModel.User != null)
                    {
                        anEventRTJModel.User.Profile = UserProfileMapper.ToModel(firstUserProfile);
                        if (anEventRTJModel.User.Profile != null)
                        {
                            anEventRTJModel.User.Profile.Avatar = ImageMapper.ToModel(firstUserProfile.Image);
                        }
                    }
                    return anEventRTJModel;
                }).ToList();

            return new ANEventDetailRequestToJoinModel()
            {
                EventId = Id,
                ANEventRequestToJoins = RTJmodels
            };
        }

        [Route("anevent-detail/cancel-my-rtj"),HttpPost]
        [HTActiveAuthorize(Roles=ANRoleConstant.USER)]
        public bool CancelMyRequestToJoin([FromBody]int eventId)
        {
            var rtjEntity = this.ANDBUnitOfWork.ANEventRequestToJoinRepository.GetAll().FirstOrDefault(x => x.ANEventId.HasValue && x.ANEventId.Value == eventId && x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id);
            if (rtjEntity == null) return false;
            this.ANDBUnitOfWork.ANEventRequestToJoinRepository.Delete(rtjEntity);
            this.ANDBUnitOfWork.Commit();
            return true;
        }
    }
}