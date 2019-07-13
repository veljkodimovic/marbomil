using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure
{
    public interface IServiceBase<T, V> 
        where T: class, ICrudDto
        where V: class, IViewDto
    {
        void Create(T entity);
        void Update(T entity);
        void Delete(int id);
        T Edit(int id);
        V Select(int id);
        IEnumerable<V> Select();
    }
}
