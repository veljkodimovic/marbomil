using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Models.Order
{
    public abstract class OrderBaseModel
    {        
        public DateTime? Date { get; set; }
        public string Note { get; set; }
        public IEnumerable<OrderItemCrudModel> Items { get; set; }
    }
}
