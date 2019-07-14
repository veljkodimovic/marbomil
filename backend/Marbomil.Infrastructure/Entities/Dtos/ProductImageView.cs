using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Dtos
{
    public class ProductImageView : IViewDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Index { get; set; }
        public string ImageUrl { get; set; }
        public string ImageCropUrl { get; set; }
    }
}
