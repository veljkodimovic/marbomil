using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Database
{
    public interface IDbEntity : IDbEntity<int>
    { }

    public interface IDbEntity<T>
    {
        T Id { get; set; }
    }
}
