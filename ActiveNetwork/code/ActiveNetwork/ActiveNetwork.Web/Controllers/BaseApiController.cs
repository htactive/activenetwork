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
        private ANDBUnitOfWork andbUnitOfWork;

        protected ANDBUnitOfWork ANDBUnitOfWork
        {
            get { return andbUnitOfWork ?? (andbUnitOfWork = new ANDBUnitOfWork(new Entities.ANDBEntities())); }
        }
    }
}