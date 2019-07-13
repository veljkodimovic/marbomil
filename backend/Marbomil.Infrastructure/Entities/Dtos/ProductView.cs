using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Dtos
{
    public class ProductView : IViewDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public int? OrderNumber { get; set; }
        public string Description { get; set; }
        public string Dimension { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public DateTime? DiscountDate { get; set; }
        public int? CollectionId { get; set; }
        public int CategoryId { get; set; }
        public int NumberOnSite { get; set; }
        public string DrawingImageUrl { get; set; }
        public IEnumerable<ProductImageView> Images { get; set; }
    }
}
