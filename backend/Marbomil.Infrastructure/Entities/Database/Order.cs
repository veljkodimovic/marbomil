using Marbomil.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Database
{
    public class Order : IDbEntity
    {
        public int Id { get; set; }
        
        public int? BuyerId { get; set; }
        [ForeignKey("BuyerId")]
        public virtual User Buyer { get; set; }

        public DateTime Date { get; set; }
        public string Note { get; set; }
        public OrderStatus Status { get; set; }

        public virtual ICollection<OrderItem> Items { get; set; }
    }
}
