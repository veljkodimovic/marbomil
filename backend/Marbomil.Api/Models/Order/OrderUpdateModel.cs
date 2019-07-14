using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Models.Order
{
    public class OrderUpdateModel : OrderBaseModel
    {
        public int Id { get; set; }
        public int BuyerId { get; set; }
    }
}
