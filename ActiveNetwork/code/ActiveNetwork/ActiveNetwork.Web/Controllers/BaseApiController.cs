using ActiveNetwork.Entities;
using ActiveNetwork.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace ActiveNetwork.Web.Controllers
{
    public class BaseApiController : ApiController
    {
        protected User CurrentUser
        {
            get
            {
                if (User == null || User.Identity == null || string.IsNullOrEmpty(User.Identity.Name)) return null;
                return this.ANDBUnitOfWork.UserRepository.GetAll().FirstOrDefault(x => x.Username == User.Identity.Name);
            }
        }
        private ANDBUnitOfWork andbUnitOfWork;

        protected ANDBUnitOfWork ANDBUnitOfWork
        {
            get { return andbUnitOfWork ?? (andbUnitOfWork = new ANDBUnitOfWork(new Entities.ANDBEntities())); }
        }
    }
}