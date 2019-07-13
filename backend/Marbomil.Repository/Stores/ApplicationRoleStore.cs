using Marbomil.Infrastructure.Entities.Database;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Repository.Stores
{
    public class ApplicationRoleStore : RoleStore<Role, int, UserRole>
    {
        public ApplicationRoleStore(MarbomilDbContext dbContext) : base(dbContext)
        { }
    }
}
