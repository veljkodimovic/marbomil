using Marbomil.Infrastructure.Entities.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure
{
    public interface IRepository : IDisposable
    {
        void Save<T>(T entity) where T : class, IDbEntity;
        void Delete<T>(int id) where T : class, IDbEntity;
        IQueryable<T> Select<T>() where T : class, IDbEntity;
        T Select<T>(int id) where T : class, IDbEntity;
        void SaveChanges();
        DbContextTransaction OpenTransaction();
    }
}
