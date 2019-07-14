using Marbomil.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Models.User.Marbomil
{
    public class UserCreateModel : UserBaseModel
    {
        public string Password { get; set; }
    }
}
