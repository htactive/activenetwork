using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
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
            try
            {
                this.DbContext.ChangeTracker.DetectChanges();
                this.DbContext.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
        }
    }
    public interface IBaseUnitOfWork<K> where K : DbContext
    {
        K DbContext { get; }
        void Commit();
    }
}
