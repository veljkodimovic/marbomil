using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Database
{
    public class ProductImage : IDbEntity
    {
        public int Id { get; set; }

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set;}

        public int Index { get; set; }

        [MaxLength(1000)]
        public string ImageUrl { get; set; }

        [MaxLength(1000)]
        public string ImageCropUrl { get; set; }
    }
}
