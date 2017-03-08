using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActiveNetwork.Repository
{
    public class BaseUnitOfWork<K> : IBaseUnitOfWork<K> where K : DbContext
    {
        public BaseUnitOfWork(K dataContext)
        {
            this.DbContext = dataContext;
        }

        public K DbContext { get; private set; }

        public void Commit()
        {
            this.DbContext.ChangeTracker.DetectChanges();
            this.DbContext.SaveChanges();
        }
    }
    public interface IBaseUnitOfWork<K> where K : DbContext
    {
        K DbContext { get; }
        void Commit();
    }
}
