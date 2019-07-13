using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Database
{
    public class Product : IDbEntity
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Title { get; set; }

        [MaxLength(50)]
        public string Code { get; set; }

        public int? OrderNumber { get; set; }
        public string Description { get; set; }

        [MaxLength(50)]
        public string Dimension { get; set; }

        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public DateTime? DiscountDate { get; set; }

        public int? CollectionId { get; set; }
        [ForeignKey("CollectionId")]
        public virtual Collection Collection { get; set; }

        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }

        public int NumberOnSite { get; set; }

        [MaxLength(1000)]
        public string DrawingImageUrl { get; set; }

        public virtual ICollection<ProductImage> Images { get; set; }
    }
}
