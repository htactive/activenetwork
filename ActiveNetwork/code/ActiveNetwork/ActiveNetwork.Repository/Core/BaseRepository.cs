using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ActiveNetwork.Repository
{
    public class BaseRepository<T, K> : IBaseRepository<T>
        where T : class
        where K : DbContext
    {
        private K dataContext;
        protected IBaseUnitOfWork<K> UnitOfWork { get; set; }
        protected DbSet<T> DbSet
        {
            get
            {
                return DbContext.Set<T>();
            }
        }
        protected K DbContext
        {
            get
            {
                return dataContext ?? (dataContext = this.UnitOfWork.DbContext);
            }
        }
        public BaseRepository(IBaseUnitOfWork<K> unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }

        protected virtual T DoAdd(T entity)
        {
            DbSet.Add(entity);

            return entity;
        }

        protected virtual T DoUpdate(T model)
        {
            var currentEntry = this.Find(model) ?? this.DbSet.Find(GetKeyId(model));

            DbContext.Entry(currentEntry).State = EntityState.Modified;
            DbContext.Entry(currentEntry).CurrentValues.SetValues(model);

            return currentEntry;
        }

        protected virtual void DoDelete(T model)
        {
            var currentEntry = this.Find(model) ?? this.DbSet.Find(GetKeyId(model));
            if (currentEntry == null) return;
            DbSet.Remove(currentEntry);
        }

        protected virtual void DoDeleteRange(IEnumerable<T> entities)
        {
            DbSet.RemoveRange(entities);
        }

        protected virtual T DoSelect(int id)
        {
            return this.DbSet.Find(id);
        }

        protected virtual void DoAddRange(IEnumerable<T> entities)
        {
            //var options = new BulkInsertOptions
            //{
            //    EnableStreaming = true,
            //};
            //DbContext.BulkInsert(entities, options);
            DbSet.AddRange(entities);
        }

        protected virtual int GetKeyId(T model)
        {
            return 0;
        }

        protected virtual T Find(T model)
        {
            return null;
        }

        public T Save(T model)
        {
            T returnValue = GetKeyId(model) != 0 ? DoUpdate(model) : DoAdd(model);
            return returnValue;
        }

        public void Save(IEnumerable<T> model)
        {
            var addNews = model.Where(x => GetKeyId(x) == 0).ToList();
            DoAddRange(addNews);
            var updates = model.Where(x => GetKeyId(x) != 0).ToList();
            foreach (var item in updates)
            {
                DoUpdate(item);
            }
        }

        public void Delete(T model)
        {
            DoDelete(model);
        }

        public void Delete(IEnumerable<T> models)
        {
            DoDeleteRange(models);
        }

        public void Delete(int id)
        {
            T entity = GetObject(id);
            Delete(entity);
        }

        public T GetObject(int id)
        {
            return DoSelect(id);
        }

        public IQueryable<T> GetAll()
        {
            return this.DbSet.AsQueryable();
        }
        public IQueryable<T> GetAll(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = DbSet;
            return includeProperties.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
        }
        public IQueryable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> query = DbSet.Where(predicate);
            return query;
        }
    }
    public interface IBaseRepository<T> where T : class
    {
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
        T Save(T model);
        void Save(IEnumerable<T> models);
        void Delete(T model);
        void Delete(int id);
        void Delete(IEnumerable<T> entities);
        T GetObject(int id);
        IQueryable<T> GetAll();
        IQueryable<T> GetAll(params Expression<Func<T, object>>[] includeProperties);
    }
}
