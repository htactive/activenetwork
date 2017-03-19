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

        [HttpGet, Route("anevent/get-events")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public List<ANEventModel> GetEvents()
        {
            var sandbox = new ANEventSearchingSandbox(this.ANDBUnitOfWork);
            var results = sandbox.Search(new SearchingSandbox.Model.SearchCriteria() { UserId = 1 });

            var anEventEntities = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include(x => x.User)
                .Include(x => x.User.UserProfiles)
                .Include("User.UserProfiles.Image")
                .Include(x => x.ANEventImages)
                .Include("ANEventImages.Image")
                .Include(x => x.ANEventInformations)
                .Where(x => results.Contains(x.Id)).ToList()
                .OrderBy(x => results.IndexOf(x.Id)).ToList();

            var anEventModels = new List<ANEventModel>();

            foreach (var entity in anEventEntities)
            {
                var model = ANEventMapper.ToModel(entity);

                // get host information
                if (entity.User != null)
                {
                    model.Host = UserMapper.ToModel(entity.User);
                    var firstProfile = entity.User.UserProfiles.FirstOrDefault();
                    model.Host.Profile = UserProfileMapper.ToModel(firstProfile);
                    if (model.Host.Profile != null)
                    {
                        model.Host.Profile.Avatar = ImageMapper.ToModel(firstProfile.Image);
                    }
                }
                // get cover image
                var coverImageEntity = entity.ANEventImages.Where(x => x.ANEventImageType == (int)Common.ANEventImageType.ANEventCoverImage).OrderBy(x => x.SortPriority).FirstOrDefault();
                if (coverImageEntity != null)
                {
                    model.CoverPhoto = ImageMapper.ToModel(coverImageEntity.Image);
                }
                // get information
                var information = entity.ANEventInformations.FirstOrDefault();
                model.Information = ANEventInformationMapper.ToModel(information);
                anEventModels.Add(model);
            }
            return anEventModels;
        }

        [HttpGet, Route("anevent/get-new-feeds")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public NewFeedsModel GetNewFeeds()
        {
            return new NewFeedsModel()
            {
                ANEvents = GetEvents(),
                ServerDateTimeNow = DateTimeHelper.DateTimeNow
            };
        }

        [HttpPost, Route("anevent/join-event")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public ANEventRequestToJoinModel JoinEvent([FromBody]int eventId)
        {
            var isExistInRTJ = this.ANDBUnitOfWork.ANEventRequestToJoinRepository.GetAll().Any(x => x.ANEventId.HasValue && x.ANEventId.Value == eventId && x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id);
            if (isExistInRTJ) return null;
            var isExistInEventMember = this.ANDBUnitOfWork.ANEventMemberRepository.GetAll().Any(x => x.ANEventId.HasValue && x.ANEventId.Value == eventId && x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id);
            if (isExistInEventMember) return null;
            var isEventHost = this.ANDBUnitOfWork.ANEventRepository.GetAll().Any(x => x.UserId.HasValue && x.UserId.Value == this.CurrentUser.Id);
            if (isEventHost) return null;

            var entity = new ANEventRequestToJoin()
            {
                UserId = this.CurrentUser.Id,
                ANEventId = eventId,
                RequestDate = DateTimeHelper.DateTimeNow,
                Status = (int)Common.ANRequestToJoinStatus.Waiting,
            };

            this.ANDBUnitOfWork.ANEventRequestToJoinRepository.Save(entity);
            this.ANDBUnitOfWork.Commit();

            return ANEventRequestToJoinMapper.ToModel(entity);

        }

        [HttpGet, Route("anevent/get-events-by-host")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public List<ANEventGroupModel> GetEventByHost(int? hostId)
        {
            var events = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include(x => x.User)
                .Include(x => x.User.UserProfiles)
                .Include("User.UserProfiles.Image")
                .Include(x => x.ANEventImages)
                .Include("ANEventImages.Image")
                .Include(x => x.ANEventInformations)
                .Include(x => x.ANEventMembers)
                .Where(e => e.UserId == (hostId ?? 0)).OrderByDescending(t => t.CreatedDate).ToList();

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

                model.CreatedDate = ev.CreatedDate;
                model.Day = ev.CreatedDate.Day;
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

            return groupEvents;
        }

        [HttpGet, Route("anevent/get-joined-events")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public List<ANEventGroupModel> GetJoinedEvent(int? hostId)
        {
            var events = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include(x => x.User)
                .Include(x => x.User.UserProfiles)
                .Include("User.UserProfiles.Image")
                .Include(x => x.ANEventImages)
                .Include("ANEventImages.Image")
                .Include(x => x.ANEventInformations)
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

                model.CreatedDate = ev.CreatedDate;
                model.Day = ev.CreatedDate.Day;
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

            return groupEvents;
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
            var eLocation = new ANEventLocation();
            eLocation.GGId = model.Information.ANEventLocation.GGId;
            eLocation.Address = model.Information.ANEventLocation.Address;
            eLocation.Name = model.Information.ANEventLocation.Name;
            eLocation.Lat = model.Information.ANEventLocation.Lat;
            eLocation.Lng = model.Information.ANEventLocation.Lng;
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
        public bool ApproveJoinEvent(int RTJId)
        {
            var firstRTJ = this.ANDBUnitOfWork.ANEventRequestToJoinRepository.GetAll().FirstOrDefault(x => x.Id == RTJId);

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
    }
}