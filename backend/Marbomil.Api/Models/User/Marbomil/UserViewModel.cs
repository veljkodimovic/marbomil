using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Models.User.Marbomil
{
    public class UserViewModel : UserBaseModel
    {
        public int Id { get; set; }
        public new string Role { set; get; }
    }
}
