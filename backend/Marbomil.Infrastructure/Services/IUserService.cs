using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Services
{
    public interface IUserService : IServiceBase<UserCrud, UserView>
    {
        bool Exists(int id);
        bool Exists(string username);
        bool ExistsByEmail(string email);
    }
}
