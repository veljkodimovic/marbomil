using Marbomil.Infrastructure;
using Marbomil.Infrastructure.Entities.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Repository
{
    public class Repository : IRepository
    {
        private readonly MarbomilDbContext dbContext;

        public Repository(MarbomilDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        #region IRepository implementation

        public void Delete<T>(int id) where T : class, IDbEntity
        {
            if (this.dbContext.Set<T>()
                              .Any(e => e.Id == id))
            {
                T entity = this.dbContext.Set<T>()
                                         .First(e => e.Id == id);

                DbEntityEntry entityEntry = this.dbContext.Entry<T>(entity);
                entityEntry.State = EntityState.Deleted;
            }
        }

        public void Save<T>(T entity) where T : class, IDbEntity
        {
            DbEntityEntry entityEntry = this.dbContext.Entry<T>(entity);

            if (this.dbContext.Set<T>()
                              .Any(e => e.Id == entity.Id))
            {
                entityEntry.State = EntityState.Modified;
            }
            else
            {
                entityEntry.State = EntityState.Added;
            }
        }

        public void SaveChanges()
        {
            this.dbContext.SaveChanges();
        }

        public IQueryable<T> Select<T>() where T : class, IDbEntity
        {
            return this.dbContext.Set<T>();
        }

        public T Select<T>(int id) where T : class, IDbEntity
        {
            return this.dbContext.Set<T>()
                                 .FirstOrDefault(e => e.Id == id);
        }

        public DbContextTransaction OpenTransaction()
        {
            return this.dbContext.OpenTransaction();
        }

        public void Dispose()
        { }

        #endregion
    }
}
