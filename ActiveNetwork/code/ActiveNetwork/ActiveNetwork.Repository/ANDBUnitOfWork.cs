using ActiveNetwork.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActiveNetwork.Repository
{
    public class ANDBUnitOfWork : BaseUnitOfWork<ANDBEntities>
    {
        public ANDBUnitOfWork(ANDBEntities entity)
            : base(entity)
        {
            //entity.Configuration.LazyLoadingEnabled = false;
            //entity.Configuration.AutoDetectChangesEnabled = false;
            entity.Database.CommandTimeout = 180;
        }
        #region Repositories

        private ITestRepository testRepository;
        public ITestRepository TestRepository
        {
            get
            {
                return testRepository ?? (testRepository = new TestRepository(this));
            }
        }

        #endregion
    }
}
