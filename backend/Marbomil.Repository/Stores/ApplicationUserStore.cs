using Marbomil.Infrastructure.Entities.Database;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Repository.Stores
{
    public class ApplicationUserStore : UserStore<User, Role, int, UserLogin, UserRole, UserClaim>
    {
        public ApplicationUserStore(MarbomilDbContext dbContext) : base(dbContext)
        { }
    }
}
