using Marbomil.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Models.User.Marbomil
{
    public class UserBaseModel
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public UserRoles? Role { get; set; }
        public bool IsActive { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Code { get; set; }
        public string WorkPlace { get; set; }
        public string Description { get; set; }
    }
}
