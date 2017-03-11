using ActiveNetwork.Web.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace ActiveNetwork.Web.Controllers
{
    public class ANEventController : BaseApiController
    {
        const string baseGoogleUrl = "https://maps.googleapis.com/maps/api/";
        const string googleApiKey = "AIzaSyAM-HP8n5wt6tBXPCp1pcrAmdhG3FQrjr0";

        [HttpGet, Route("anevent/get-all-topics")]
        public List<TopicModel> GetAllTopics()
        {
            var entities = this.ANDBUnitOfWork.TopicRepository.GetAll().Take(1000).ToList();

            return entities.Select(x => new TopicModel()
            {
                Description = x.Description,
                Id = x.Id,
                Name = x.Name
            }).ToList();
        }
    }
}