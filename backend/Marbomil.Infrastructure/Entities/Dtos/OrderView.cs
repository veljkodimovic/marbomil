using Marbomil.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Dtos
{
    public class OrderView : IViewDto
    {
        public int Id { get; set; }
        public int BuyerId { get; set; }
        public string BuyerUsername { get; set; }
        public DateTime Date { get; set; }
        public string Note { get; set; }
        public OrderStatus Status { get; set; }
        public IEnumerable<OrderItemView> Items { get; set; }
    }
}
