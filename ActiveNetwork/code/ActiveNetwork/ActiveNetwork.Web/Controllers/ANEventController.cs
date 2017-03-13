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

namespace ActiveNetwork.Web.Controllers
{
    public class ANEventController : BaseApiController
    {
        const string baseGoogleUrl = "https://maps.googleapis.com/maps/api/";
        const string googleApiKey = "AIzaSyAM-HP8n5wt6tBXPCp1pcrAmdhG3FQrjr0";

        [HttpGet, Route("anevent/get-all-categories")]
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
        public bool CreateDummyANEvents()
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

        [Route("anevent/get-event"), HttpGet]
        public ANEventModel GetEvent(int Id)
        {
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll().FirstOrDefault(x => x.Id == Id);
            if (entity == null) return null;
            return ANEventMapper.ToModel(entity);
        }
    }
}