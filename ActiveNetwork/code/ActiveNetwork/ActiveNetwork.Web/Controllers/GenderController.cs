using ActiveNetwork.Web.Mapper;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ActiveNetwork.Web.Controllers
{
    public class GenderController : BaseApiController
    {
        [HttpGet, Route("gender/get-all-genders")]
        [AllowAnonymous]
        public List<GenderModel> GetAllGenders()
        {
            return this.ANDBUnitOfWork.GenderRepository.GetAll().Take(100).ToList().Select(GenderMapper.ToModel).ToList();
        }
    }
}