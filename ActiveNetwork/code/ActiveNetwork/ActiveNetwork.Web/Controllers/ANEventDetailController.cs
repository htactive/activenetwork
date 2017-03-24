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
using System.Net;
using System.Threading.Tasks;


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
            var isPendingMember = this.ANDBUnitOfWork.ANEventRequestToJoinRepository.GetAll().Any(x => x.ANEventId.HasValue && x.ANEventId.Value == Id && x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id && x.Status == (int)Common.ANRequestToJoinStatus.Waiting);
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
                .Include("ANEventInformations.ANEventLocation")
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
            if (informationModel.EventInformation != null)
            {
                informationModel.EventInformation.ANEventLocation = ANEventLocationMapper.ToModel(firstInformation.ANEventLocation);
            }
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
            if (!this.ANDBUnitOfWork.ANEventRepository.GetAll().Any(x => x.Id == Id && x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id))
            {
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }
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

        [Route("anevent-detail/cancel-my-rtj"), HttpPost]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public bool CancelMyRequestToJoin([FromBody]int eventId)
        {
            var rtjEntity = this.ANDBUnitOfWork.ANEventRequestToJoinRepository.GetAll().FirstOrDefault(x => x.ANEventId.HasValue && x.ANEventId.Value == eventId && x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id);
            if (rtjEntity == null) return false;
            this.ANDBUnitOfWork.ANEventRequestToJoinRepository.Delete(rtjEntity);
            this.ANDBUnitOfWork.Commit();
            return true;
        }
        [Route("anevent-detail/leave-event"), HttpPost]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public bool LeaveEvent([FromBody]int eventId)
        {
            var anEventMemberEntity = this.ANDBUnitOfWork.ANEventMemberRepository.GetAll().FirstOrDefault(x => x.ANEventId.HasValue && x.ANEventId.Value == eventId && x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id);
            if (anEventMemberEntity == null) return false;
            this.ANDBUnitOfWork.ANEventMemberRepository.Delete(anEventMemberEntity);
            this.ANDBUnitOfWork.Commit();
            return true;
        }

        [Route("anevent-detail/get-related-events"), HttpGet]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public List<ANEventModel> GetRelatedEvents(int eventId)
        {
            var hostId = this.ANDBUnitOfWork.ANEventRepository.GetAll().Where(x => x.Id == eventId).Select(x => x.UserId).FirstOrDefault().GetValueOrDefault();
            if (hostId == 0) return null;
            var events = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include(x => x.User)
                .Include(x => x.User.UserProfiles)
                .Include("User.UserProfiles.Image")
                .Include(x => x.ANEventImages)
                .Include("ANEventImages.Image")
                .Include("ANEventInformations.ANEventLocation")
                .Include(x => x.ANEventMembers)
                .Where(e => e.UserId.HasValue && e.UserId.Value == hostId && e.Id != eventId).OrderByDescending(t => t.CreatedDate).Take(3).ToList();

            var anEventModels = new List<ANEventModel>();

            foreach (var ev in events)
            {
                var model = new ANEventModel();
                model.Id = ev.Id;
                model.Host = UserMapper.ToModel(ev.User);
                // get cover image
                var coverImageEntity = ev.ANEventImages.Where(x => x.ANEventImageType == (int)Common.ANEventImageType.ANEventCoverImage).OrderBy(x => x.SortPriority).FirstOrDefault();
                if (coverImageEntity != null)
                {
                    model.CoverPhoto = ImageMapper.ToModel(coverImageEntity.Image);
                }
                var information = ev.ANEventInformations.FirstOrDefault();
                model.Information = ANEventInformationMapper.ToModel(information);
                if (model.Information != null)
                {
                    model.Information.ANEventLocation = ANEventLocationMapper.ToModel(information.ANEventLocation);
                }
                model.CreatedDate = ev.CreatedDate;
                model.NumberOfMember = ev.ANEventMembers.Count;
                anEventModels.Add(model);
            }

            return anEventModels;
        }

        
        [Route("anevent-detail/update-event-description"), HttpPost]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public bool UpdateEventDescription(UpdateEventDescriptionRequestModel request)
        {
            var anEvent = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include(x=>x.ANEventInformations)
                .FirstOrDefault(x => x.Id == request.ANEventId);
            if (anEvent == null) return false;
            if (!anEvent.UserId.HasValue || anEvent.UserId.Value != this.CurrentUser.Id)
            {
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }
            var firstInformation = anEvent.ANEventInformations.FirstOrDefault();
            if (firstInformation == null) return false;
            firstInformation.Description = request.Description;
            this.ANDBUnitOfWork.ANEventInformationRepository.Save(firstInformation);
            this.ANDBUnitOfWork.Commit();
            return true;

        }
        [Route("anevent-detail/update-event-title"), HttpPost]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public bool UpdateEventDescription(UpdateEventTitleRequestModel request)
        {
            var anEvent = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include(x => x.ANEventInformations)
                .FirstOrDefault(x => x.Id == request.ANEventId);
            if (anEvent == null) return false;
            if (!anEvent.UserId.HasValue || anEvent.UserId.Value != this.CurrentUser.Id)
            {
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }
            var firstInformation = anEvent.ANEventInformations.FirstOrDefault();
            if (firstInformation == null) return false;
            firstInformation.Title = request.Title;
            this.ANDBUnitOfWork.ANEventInformationRepository.Save(firstInformation);
            this.ANDBUnitOfWork.Commit();
            return true;

        }
    }
}