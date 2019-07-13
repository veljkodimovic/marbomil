using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Models.Order
{
    public class OrderViewModel : OrderBaseModel
    {
        public int Id { get; set; }
        public int BuyerId { get; set; }
        public string BuyerUsername { get; set; }
        public new IEnumerable<OrderItemViewModel> Items { get; set; }
    }
}
