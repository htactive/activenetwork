using ActiveNetwork.Entities;
using ActiveNetwork.Web.Mapper;
using ActiveNetwork.Web.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using ActiveNetwork.SearchingSandbox;
using System.Web.Http;
using System.Data.Entity;
using HTActive.Authorize.Core;
using ActiveNetwork.Common;
using System.Net;

namespace ActiveNetwork.Web.Controllers
{
    public class ANEventController : BaseApiController
    {
        const string baseGoogleUrl = "https://maps.googleapis.com/maps/api/";
        const string googleApiKey = "AIzaSyAM-HP8n5wt6tBXPCp1pcrAmdhG3FQrjr0";

        [HttpGet, Route("anevent/get-all-categories"), AllowAnonymous]
        public List<CategoryModel> GetAllCategories()
        {
            var entities = this.ANDBUnitOfWork.CategoryRepository.GetAll().Take(1000).ToList();

            return entities.Select(x => new CategoryModel()
            {
                Description = x.Description,
                Id = x.Id,
                Name = x.Name
            }).ToList();
        }

        [HttpPost, Route("anevent/create-dummy-anevents")]
        private bool CreateDummyANEvents()
        {
            var entities = new List<ANEvent>();
            for (int i = 0; i < 100; i++)
            {
                var en = new ANEvent()
                {
                    Id = 0,
                    UpdatedDate = DateTime.Now,
                    CreatedDate = DateTime.Now.AddHours((new Random(Guid.NewGuid().GetHashCode())).Next(-20, 20)),
                    ANEventInformations = new List<ANEventInformation>() { new ANEventInformation(){
                        Id = 0,
                        Description = string.Format("{0:00}",i) + " -- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. Vivamus ullamcorper aliquam purus, et euismod justo. Nulla",
                    } }
                };
                entities.Add(en);
            }
            this.ANDBUnitOfWork.ANEventRepository.Save(entities);
            this.ANDBUnitOfWork.Commit();
            return true;
        }

        [HttpGet, Route("anevent/get-events-in-new-feeds")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public List<ANEventModel> GetEventsInNewFeeds()
        {
            var currentUserId = this.CurrentUser.Id;
            var sandbox = new ANEventSearchingSandbox(this.ANDBUnitOfWork);
            var results = sandbox.Search(new SearchingSandbox.Model.SearchCriteria() { UserId = currentUserId });

            var anEventEntities = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include("User.UserProfiles.Image")
                .Include("ANEventImages.Image")
                .Include("ANEventInformations")
                .Where(x => results.Contains(x.Id)).ToList()
                .OrderBy(x => results.IndexOf(x.Id)).ToList();

            var favoritedEntities = this.ANDBUnitOfWork.ANEventUserFavouriteRepository.GetAll().Where(x => x.ANEventId.HasValue && results.Contains(x.ANEventId.Value) && x.UserId.HasValue && x.UserId.Value == currentUserId).ToList();

            var anEventModels = new List<ANEventModel>();

            foreach (var entity in anEventEntities)
            {
                var anEventModel = ANEventMapper.ToModel(entity);

                // get host information
                if (entity.User != null)
                {
                    anEventModel.Host = UserMapper.ToModel(entity.User);
                    var firstProfile = entity.User.UserProfiles.FirstOrDefault();
                    anEventModel.Host.Profile = UserProfileMapper.ToModel(firstProfile);
                    if (anEventModel.Host.Profile != null)
                    {
                        anEventModel.Host.Profile.Avatar = ImageMapper.ToModel(firstProfile.Image);
                    }
                }
                // get cover image
                var coverImageEntity = entity.ANEventImages.Where(x => x.ANEventImageType == (int)Common.ANEventImageType.ANEventCoverImage).OrderBy(x => x.SortPriority).FirstOrDefault();
                if (coverImageEntity != null)
                {
                    anEventModel.CoverPhoto = ImageMapper.ToModel(coverImageEntity.Image);
                }
                // get information
                var information = entity.ANEventInformations.FirstOrDefault();
                anEventModel.Information = ANEventInformationMapper.ToModel(information);
                anEventModel.ANEventUserFavourites = ANEventUserFavouriteMapper.ToModel(favoritedEntities.Where(x => x.ANEventId.HasValue && x.ANEventId.Value == anEventModel.Id));
                anEventModels.Add(anEventModel);
            }
            return anEventModels;
        }

        [HttpGet, Route("anevent/get-new-feeds")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public NewFeedsModel GetNewFeeds()
        {
            return new NewFeedsModel()
            {
                ANEvents = GetEventsInNewFeeds(),
                ServerDateTimeNow = DateTimeHelper.DateTimeNow
            };
        }

        [HttpPost, Route("anevent/join-event")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public ANEventRequestToJoinModel JoinEvent([FromBody]int eventId)
        {
            var isExistInEventMember = this.ANDBUnitOfWork.ANEventMemberRepository.GetAll().Any(x => x.ANEventId.HasValue && x.ANEventId.Value == eventId && x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id);
            if (isExistInEventMember) return null;

            var isEventHost = this.ANDBUnitOfWork.ANEventRepository.GetAll().Any(x => x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id && x.Id == eventId);
            if (isEventHost) return null;

            var entityInRTJ = this.ANDBUnitOfWork.ANEventRequestToJoinRepository.GetAll().FirstOrDefault(x => x.ANEventId.HasValue && x.ANEventId.Value == eventId && x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id);
            if (entityInRTJ != null && entityInRTJ.Status == (int)Common.ANRequestToJoinStatus.Waiting) return null;
            if (entityInRTJ == null)
            {
                entityInRTJ = new ANEventRequestToJoin()
                {
                    UserId = this.CurrentUser.Id,
                    ANEventId = eventId,
                    RequestDate = DateTimeHelper.DateTimeNow,
                };
            }
            entityInRTJ.Status = (int)Common.ANRequestToJoinStatus.Waiting;

            this.ANDBUnitOfWork.ANEventRequestToJoinRepository.Save(entityInRTJ);
            this.ANDBUnitOfWork.Commit();

            return ANEventRequestToJoinMapper.ToModel(entityInRTJ);

        }

        [HttpGet, Route("anevent/get-events-by-host")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public List<ANEventModel> GetEventByHost()
        {
            var hostId = this.CurrentUser.Id;
            var events = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include(x => x.User)
                .Include(x => x.User.UserProfiles)
                .Include("User.UserProfiles.Image")
                .Include(x => x.ANEventImages)
                .Include("ANEventImages.Image")
                .Include("ANEventInformations.ANEventLocation")
                .Include(x => x.ANEventMembers)
                .Where(e => e.UserId == (hostId)).OrderByDescending(t => t.CreatedDate).ToList();

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

        [HttpGet, Route("anevent/get-events-in-week")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public List<ANEventModel> GetEventInWeek()
        {
            DateTime input = DateTime.Now;
            int delta = DayOfWeek.Monday - input.DayOfWeek;
            int first = input.AddDays(delta).Day;
            int last = first + 7;
            var hostId = this.CurrentUser.Id;
            var events = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include(x => x.User)
                .Include(x => x.User.UserProfiles)
                .Include("User.UserProfiles.Image")
                .Include(x => x.ANEventImages)
                .Include("ANEventImages.Image")
                .Include("ANEventInformations.ANEventLocation")
                .Include(x => x.ANEventMembers)
                .Where(e => (e.UserId == (hostId) || e.ANEventMembers.Select(f => f.UserId).Contains(hostId))
                        && e.ANEventInformations.FirstOrDefault().StartDate.Value.Day >= first 
                        && e.ANEventInformations.FirstOrDefault().StartDate.Value.Day < last)
                .OrderByDescending(t => t.CreatedDate).ToList();

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

        [HttpGet, Route("anevent/get-joined-events")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public List<ANEventModel> GetJoinedEvent()
        {
            var hostId = this.CurrentUser.Id;
            var events = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include(x => x.User)
                .Include(x => x.User.UserProfiles)
                .Include("User.UserProfiles.Image")
                .Include(x => x.ANEventImages)
                .Include("ANEventImages.Image")
                .Include("ANEventInformations.ANEventLocation")
                .Include(x => x.ANEventMembers)
                .Where(e => e.ANEventMembers.Select(f => f.UserId).Contains(hostId)).OrderByDescending(t => t.CreatedDate).ToList();

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

            var groupEvents = anEventModels.GroupBy(t => t.CreatedDate.Year)
                .Select(gr => new ANEventGroupModel
                {
                    Year = gr.Key,
                    EventMonth = gr.GroupBy(m => new { m.CreatedDate.Year, m.CreatedDate.Month })
                    .Select(grm => new ANEventMonthGroup
                    {
                        Month = grm.Key.Month,
                        Events = grm.ToList()
                    }).ToList()
                }).ToList();

            return anEventModels;
        }

        [HttpGet, Route("anevent/get-my-favourite-events")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public List<ANEventModel> GetMyEventFavourites()
        {
            var currentUserId = this.CurrentUser.Id;
            var anEventEntities = this.ANDBUnitOfWork.ANEventUserFavouriteRepository.GetAll()
                .Where(x => x.UserId.HasValue && x.UserId.Value == currentUserId)
                .Select(x => x.ANEvent)
                .Include("User.UserProfiles.Image")
                .Include("ANEventImages.Image")
                .Include("ANEventInformations.ANEventLocation")
                .ToList()
                .OrderByDescending(x => x.CreatedDate).ToList();

            var anEventModels = new List<ANEventModel>();
            var anEventIds = anEventEntities.Select(x => x.Id).ToList();
            var numberOfMembers = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Where(x=>anEventIds.Contains(x.Id))
                .Select(x=> new {Id=x.Id, numberOfMember = x.ANEventMembers.Count()}).ToList();

            foreach (var entity in anEventEntities)
            {
                var anEventModel = ANEventMapper.ToModel(entity);

                // get host information
                if (entity.User != null)
                {
                    anEventModel.Host = UserMapper.ToModel(entity.User);
                    var firstProfile = entity.User.UserProfiles.FirstOrDefault();
                    anEventModel.Host.Profile = UserProfileMapper.ToModel(firstProfile);
                    if (anEventModel.Host.Profile != null)
                    {
                        anEventModel.Host.Profile.Avatar = ImageMapper.ToModel(firstProfile.Image);
                    }
                }
                // get cover image
                var coverImageEntity = entity.ANEventImages.Where(x => x.ANEventImageType == (int)Common.ANEventImageType.ANEventCoverImage).OrderBy(x => x.SortPriority).FirstOrDefault();
                if (coverImageEntity != null)
                {
                    anEventModel.CoverPhoto = ImageMapper.ToModel(coverImageEntity.Image);
                }
                // get information
                var information = entity.ANEventInformations.FirstOrDefault();
                anEventModel.Information = ANEventInformationMapper.ToModel(information);
                anEventModel.NumberOfMember = numberOfMembers.Where(x => x.Id == anEventModel.Id).Select(x => x.numberOfMember).FirstOrDefault();
                anEventModel.Information.ANEventLocation = ANEventLocationMapper.ToModel(information.ANEventLocation);
                anEventModels.Add(anEventModel);
            }
            return anEventModels;
        }

        [HttpPost, Route("anevent/create-event")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public bool CreateANEvent(ANEventModel model)
        {
            var eEvent = new ANEvent();
            eEvent.UserId = CurrentUser.Id;
            eEvent.CreatedDate = DateTime.Now;
            eEvent.UpdatedDate = DateTime.Now;
            var eInfo = new ANEventInformation();
            eInfo.Title = model.Information.Title;
            eInfo.StartDate = model.Information.StartDate;
            eInfo.EndDate = model.Information.EndDate;
            eInfo.Description = model.Information.Description;
            eInfo.ShortDescription = model.Information.ShortDescription;
            var eLocation = new ANEventLocation();
            eLocation.GGId = model.Information.ANEventLocation.GGId;
            eLocation.Address = model.Information.ANEventLocation.Address;
            eLocation.Name = model.Information.ANEventLocation.Name;
            eLocation.Lat = model.Information.ANEventLocation.Lat;
            eLocation.Lng = model.Information.ANEventLocation.Lng;

            if (model.ANEventRequirements != null)
            {
                var eRequirement = model.ANEventRequirements.Select(x => new ANEventRequirement()
                {
                    Id = x.Id,
                    RequiredId = x.RequiredId,
                    RequiredProfile = new RequiredProfile() { Id = x.RequiredProfile.Id },
                    ANEventId = x.ANEventId,
                    ANEvent = new ANEvent() { Id = x.ANEvent.Id },
                }).ToList();
                eEvent.ANEventRequirements = eRequirement;
            }
            var eCategories = model.Categories.Select(x => new Category()
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description
            }).ToList();
            eInfo.ANEventLocation = eLocation;
            eInfo.ANEvent = eEvent;
            eEvent.ANEventCategories = model.Categories.Select(x => new ANEventCategory()
            {
                CategoryId = x.Id
            }).ToList();
            var elstInfo = new List<ANEventInformation>();
            elstInfo.Add(eInfo);
            eEvent.ANEventInformations = elstInfo;
            //ANImage
            var eANEventImage = new ANEventImage()
            {
                ImageId = model.CoverPhoto.Id,
                ANEventImageType = (int)Common.ANEventImageType.ANEventCoverImage
            };
            var lstANEventImage = new List<ANEventImage>();
            lstANEventImage.Add(eANEventImage);
            eEvent.ANEventImages = lstANEventImage;
            this.ANDBUnitOfWork.ANEventRepository.Save(eEvent);
            this.ANDBUnitOfWork.Commit();
            return true;
        }
        [HttpPost, Route("anevent/upload-cover-photo")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public async Task<ImageModel> UploadCoverPhoto()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return null;
            }
            var currentProfile = this.ANDBUnitOfWork.UserProfileRepository.GetAll().FirstOrDefault(x => x.UserId.HasValue && x.UserId.Value == CurrentUser.Id);
            if (currentProfile == null) return null;
            var filesReadToProvider = await Request.Content.ReadAsMultipartAsync();

            if (filesReadToProvider.Contents.Count == 0) return null;
            var stream = await filesReadToProvider.Contents[0].ReadAsStreamAsync();
            var fileKey = string.Format("event/cover/cv{0}.png", Guid.NewGuid().ToString());

            var image = await this.CreateNewImage(stream, fileKey);
            return ImageMapper.ToModel(image);
        }

        [HttpPost, Route("anevent/approve-join-event")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public bool ApproveJoinEvent([FromBody]int RTJId)
        {
            var firstRTJ = this.ANDBUnitOfWork.ANEventRequestToJoinRepository.GetAll()
                .Include("ANEvent")
                .FirstOrDefault(x => x.Id == RTJId);

            if (firstRTJ == null || firstRTJ.ANEvent == null) return false;
            if (firstRTJ.Status != (int)ANRequestToJoinStatus.Waiting) return false;
            if (!firstRTJ.ANEvent.UserId.HasValue || firstRTJ.ANEvent.UserId.Value != this.CurrentUser.Id)
            {
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }

            if (!this.ANDBUnitOfWork.ANEventMemberRepository.GetAll().Any(x => x.UserId == firstRTJ.UserId && x.ANEventId == firstRTJ.ANEventId))
            {
                var entity = new ANEventMember()
                {
                    ANEventId = firstRTJ.ANEventId,
                    UserId = firstRTJ.UserId,
                    JoinDate = DateTimeHelper.DateTimeNow,
                };

                this.ANDBUnitOfWork.ANEventMemberRepository.Save(entity);
            }
            firstRTJ.Status = (int)ANRequestToJoinStatus.Approved;
            this.ANDBUnitOfWork.ANEventRequestToJoinRepository.Save(firstRTJ);
            this.ANDBUnitOfWork.Commit();


            return true;
        }
        [HttpPost, Route("anevent/add-event-to-favourites")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public ANEventUserFavouriteModel AddEventToFavourites(AddOrRemoveEventToFavouritesRequestModel request)
        {
            var userId = this.CurrentUser.Id;
            var eventId = request.ANEventId;
            if (this.ANDBUnitOfWork.ANEventUserFavouriteRepository.GetAll().Any(x => x.ANEventId.HasValue && x.ANEventId.Value == eventId && x.UserId.HasValue && x.UserId.Value == userId)) return null;
            var entity = new ANEventUserFavourite() { UserId = userId, ANEventId = eventId, CreatedDate = DateTimeHelper.DateTimeNow };
            this.ANDBUnitOfWork.ANEventUserFavouriteRepository.Save(entity);
            this.ANDBUnitOfWork.Commit();
            return ANEventUserFavouriteMapper.ToModel(entity);
        }
        [HttpPost, Route("anevent/remove-event-from-favourites")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public bool RemoveEventFromFavourites(AddOrRemoveEventToFavouritesRequestModel request)
        {
            var userId = this.CurrentUser.Id;
            var eventId = request.ANEventId;
            var entity = this.ANDBUnitOfWork.ANEventUserFavouriteRepository.GetAll().Where(x => x.ANEventId.HasValue && x.ANEventId.Value == eventId && x.UserId.HasValue && x.UserId.Value == userId).FirstOrDefault();
            if (entity == null) return false;
            this.ANDBUnitOfWork.ANEventUserFavouriteRepository.Delete(entity);
            this.ANDBUnitOfWork.Commit();
            return true;
        }

        [HttpPost, Route("anevent/deny-join-event")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public bool DenyJoinEvent([FromBody]int RTJId)
        {
            var firstRTJ = this.ANDBUnitOfWork.ANEventRequestToJoinRepository.GetAll()
                .Include("ANEvent")
                .FirstOrDefault(x => x.Id == RTJId);

            if (firstRTJ == null || firstRTJ.ANEvent == null) return false;
            if (firstRTJ.Status != (int)ANRequestToJoinStatus.Waiting) return false;
            if (!firstRTJ.ANEvent.UserId.HasValue || firstRTJ.ANEvent.UserId.Value != this.CurrentUser.Id)
            {
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }

            firstRTJ.Status = (int)ANRequestToJoinStatus.Denied;
            this.ANDBUnitOfWork.ANEventRequestToJoinRepository.Save(firstRTJ);
            this.ANDBUnitOfWork.Commit();
            return true;
        }
    }
}