﻿using ActiveNetwork.Entities;
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
                .Where(x => results.Contains(x.Id)).ToList();

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

        [HttpPost, Route("anevent/join-event")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public ANEventRequestToJoinModel JoinEvent([FromBody]RequestToJoinModel model)
        {
            if (model == null || model.EventId == 0 || model.UserId == 0)
            {
                return null;
            }
            var RTJentity = this.ANDBUnitOfWork.RequestToJoinRepository.GetAll();

            //check if already joined
            if (RTJentity != null)
            {
                foreach (var tmp in RTJentity)
                {
                    if (tmp.ANEventId == model.EventId && tmp.UserId == model.UserId)
                    {
                        return null;
                    }
                }
            }

            var entity = new ANEventRequestToJoin()
            {
                UserId = model.UserId,
                ANEventId = model.EventId,
                RequestDate = DateTimeHelper.DateTimeNow,
            };

            this.ANDBUnitOfWork.RequestToJoinRepository.Save(entity);
            this.ANDBUnitOfWork.Commit();

            return ANEventRequestToJoinMapper.ToModel(entity);

        }

        [HttpGet, Route("anevent/get-events-by-host")]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public List<ANEventModel> GetEventByHost(int? hostId)
        {
            var events = this.ANDBUnitOfWork.ANEventRepository.GetAll().Where(e => e.UserId == (hostId ?? 0));

            return null;
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
            eLocation.GGId = model.Information.EventLocationM.GGId;
            eLocation.Address = model.Information.EventLocationM.Address;
            eLocation.Name = model.Information.EventLocationM.Name;
            eLocation.Lat = model.Information.EventLocationM.Lat;
            eLocation.Lng = model.Information.EventLocationM.Lng;
            var eCategories = model.Categories.Select(x => new Category() {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description
            }).ToList();
            eInfo.ANEventLocation = eLocation;
            eInfo.ANEvent = eEvent;
            eEvent.ANEventCategories = model.Categories.Select(x=> new ANEventCategory()
            {
                CategoryId = x.Id
            }).ToList();
            var elstInfo = new List<ANEventInformation>();
            elstInfo.Add(eInfo);
            eEvent.ANEventInformations = elstInfo;
            this.ANDBUnitOfWork.ANEventRepository.Save(eEvent);
            this.ANDBUnitOfWork.Commit();
            return true;
        }
    }
}