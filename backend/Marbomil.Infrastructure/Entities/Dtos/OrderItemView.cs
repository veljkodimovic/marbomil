using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Dtos
{
    public class OrderItemView : IViewDto
    {
        public int Id { get; set; }
        public string ProductCode { get; set; }
        public decimal Price { get; set; }
        public decimal PriceWithDiscount { get; set; }
        public int Quantity { get; set; }
    }
}
